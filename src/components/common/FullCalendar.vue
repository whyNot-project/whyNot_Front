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
        height: "400px",
      },
    };
  },
};
</script>

<template>
  <FullCalendar :options="calendarOptions" />
</template>
