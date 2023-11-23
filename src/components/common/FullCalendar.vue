<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import { onMounted, ref } from "vue";
import http from "@/util/http-commons.js";

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  setup() {
    const userId = localStorage.getItem("userId");
    const myCrewList = ref([]);
    myCrewList.value = http.get(`/userCrewList/${userId}`).then((res) => {
      myCrewList.value = res.data;
      updateCalendarOptions();
    });

    const updateCalendarOptions = () => {
      calendarOptions.value.events = myCrewList.value.map((crew) => ({
        title: crew.crewName,
        start: crew.schedule, // Adjust accordingly based on your data structure
      }));
    };

    const calendarOptions = ref({
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
    });

    return {
      calendarOptions,
      myCrewList,
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
