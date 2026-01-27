import { useMemo, useRef, useState } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import styles from "./Calendar.module.css";

import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";

import { apiFetch } from "../../services/api";

function Calendar() {
  const workLocations = useLoaderData();
  const revalidator = useRevalidator();
  const dialogRef = useRef(null);

  const [selectedDate, setSelectedDate] = useState(null); // YYYY-MM-DD
  const [location, setLocation] = useState("WFO");
  const [editingId, setEditingId] = useState(null); // backend ID or null

  /**
   * Build a lookup table:
   * YYYY-MM-DD -> { id, location }
   */
  const byDate = useMemo(() => {
    const map = {};
    for (const item of workLocations) {
      const dateKey = item.work_date.slice(0, 10); // normalize backend timestamp
      map[dateKey] = {
        id: item.id,
        location: item.location,
      };
    }
    return map;
  }, [workLocations]);

  /**
   * Calendar events (force date-only semantics)
   */
  const events = workLocations.map((item) => {
    const dateKey = item.work_date.slice(0, 10);

    const colorMap = {
      WFO: "var(--event-wfo)",
      WFH: "var(--event-wfh)",
      LEAVE: "var(--event-leave)",
      HOLIDAY: "var(--event-holiday)",
    };

    return {
      id: item.id,
      start: dateKey,
      allDay: true,
      title: item.location,
      backgroundColor: colorMap[item.location],
      borderColor: colorMap[item.location],
      extendedProps: {
        dateKey,
      },
    };
  });

  function openDialog(dateKey) {
    setSelectedDate(dateKey);

    if (byDate[dateKey]) {
      // EDIT mode
      setEditingId(byDate[dateKey].id);
      setLocation(byDate[dateKey].location);
    } else {
      // CREATE mode
      setEditingId(null);
      setLocation("WFO");
    }

    dialogRef.current.showModal();
  }

  function closeDialog() {
    dialogRef.current.close();
    setSelectedDate(null);
    setEditingId(null);
    setLocation("WFO");
  }

  function handleBackdropClick(e) {
    if (e.target === dialogRef.current) {
      closeDialog();
    }
  }

  async function handleCreate() {
    await apiFetch("/api/work-locations", {
      method: "POST",
      body: JSON.stringify({
        workDate: selectedDate, // YYYY-MM-DD (date-only, no timezone)
        location,
      }),
    });

    closeDialog();
    revalidator.revalidate();
  }

  async function handleUpdate() {
    await apiFetch(`/api/work-locations/${editingId}`, {
      method: "PUT",
      body: JSON.stringify({ location }),
    });

    closeDialog();
    revalidator.revalidate();
  }

  async function handleDelete() {
    await apiFetch(`/api/work-locations/${editingId}`, {
      method: "DELETE",
    });

    closeDialog();
    revalidator.revalidate();
  }

  function getDayClass(location) {
    switch (location) {
      case "WFO":
        return "day-wfo";
      case "WFH":
        return "day-wfh";
      case "LEAVE":
        return "day-leave";
      case "HOLIDAY":
        return "day-holiday";
      default:
        return "";
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Calendar</h1>

      <div className={styles.calendar}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          timeZone="local"
          events={events}
          dateClick={(info) => openDialog(info.dateStr)}
          eventClick={(info) => {
            const dateKey = info.event.startStr;
            const id = info.event.id;

            setSelectedDate(dateKey);
            setEditingId(id);
            setLocation(byDate[dateKey]?.location ?? "WFO");

            dialogRef.current.showModal();
          }}
          eventDidMount={(info) => {
            const location = info.event.title;
            const className = getDayClass(location);

            const dayCell = info.el.closest(".fc-daygrid-day");

            if (dayCell && className) {
              dayCell.classList.add(className);
            }
          }}
        />
      </div>

      <dialog
        ref={dialogRef}
        onClick={handleBackdropClick}
        className={styles.dialog}
      >
        <div className={styles.dialogContent}>
          <h2 className={styles.dialogTitle}>
            {editingId ? "Edit Work Location" : "Add Work Location"}
          </h2>

          <p className={styles.dialogDate}>{selectedDate}</p>

          <div className={styles.field}>
            <label>Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="WFO">WFO</option>
              <option value="WFH">WFH</option>
              <option value="LEAVE">Leave</option>
              <option value="HOLIDAY">Holiday</option>
            </select>
          </div>

          <div className={styles.actions}>
            <button
              className={`${styles.button} ${styles.ghost}`}
              onClick={closeDialog}
            >
              Cancel
            </button>

            {!editingId && (
              <button
                className={`${styles.button} ${styles.primary}`}
                onClick={handleCreate}
              >
                Create
              </button>
            )}

            {editingId && (
              <>
                <button
                  className={`${styles.button} ${styles.primary}`}
                  onClick={handleUpdate}
                >
                  Update
                </button>

                <button
                  className={`${styles.button} ${styles.danger}`}
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Calendar;
