<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data: function () {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin],
        initialView: "dayGridMonth",
        weekends: true,
        events: [
          {
            title: "모임",
            start: new Date(),
            display: "background",
          },
        ],
        height: "430px",
      },
    };
  },
};
</script>

<template>
  <FullCalendar :options="calendarOptions" />
</template>

<style>
/* November 2023 title부분 */
.fc .fc-toolbar-title {
  font-size: 15px;
}

.fc .fc-button {
  font-size: 10px;
}
</style>
