<template>
  <div class="buttonContainer">
    <template v-for="(space, index) in spaceList" :key="space.name">
      <button
        class="spaceButton"
        @click="spaceButtonClick(index)"
        :class="{ selected: space.selected }"
      >
        {{ space.name }}
      </button>
    </template>
  </div>
  <div class="reservationList">
    <template v-for="reservation in reservationList" :key="reservation.url">
      <div class="card">
        <img :src="reservation.IMGURL" alt="url" />
        <div class="card-content">
          <h2>
            {{ reservation.PLACENM + " " + reservation.MINCLASSNM }}
            <h6>{{ "(" + reservation.SVCID + ")" }}</h6>
          </h2>

          <p>
            TELEPHONE : {{ reservation.TELNO }} <br />영업 시간 :
            {{ reservation.V_MIN }} - {{ reservation.V_MAX }}
          </p>
          <a :href="reservation.SVCURL" class="button"> 예약하러 가기 </a>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const reservationList = ref([]);
const spaceList = ref([
  {
    name: "축구장",
    selected: true,
  },
  {
    name: "테니스장",
    selected: false,
  },
  {
    name: "풋살장",
    selected: false,
  },
  {
    name: "체육관",
    selected: false,
  },
  {
    name: "다목적경기장",
    selected: false,
  },
  {
    name: "골프장",
    selected: false,
  },
]);
const spaceName = ref("축구장");
const spaceButtonClick = (newIdx) => {
  const oldIdx = spaceList.value.findIndex((e) => e.name === spaceName.value);
  spaceList.value[oldIdx].selected = false;
  spaceList.value[newIdx].selected = true;
  spaceName.value = spaceList.value[newIdx].name;
  getList();
};

onMounted(() => {
  getList();
});

const getList = () => {
  axios
    .get(
      `http://openAPI.seoul.go.kr:8088/4c506d575063756a373371584f5776/xml/ListPublicReservationSport/1/20/${spaceName.value}`
    )
    .then((res) => {
      var XmlNode = new DOMParser().parseFromString(res.data, "text/xml");
      const result = (reservationList.value =
        xmlToJson(XmlNode).ListPublicReservationSport.row);
    });
};

const xmlToJson = (xml) => {
  // xml => json 변환 xmlToJson함수
  let obj = {};

  if (xml.nodeType == 1) {
    // element
    // do attributes
    if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
      for (let j = 0; j < xml.attributes.length; j++) {
        let attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType == 3) {
    // text
    obj = xml.nodeValue;
  }

  let textNodes = [].slice.call(xml.childNodes).filter(function (node) {
    return node.nodeType === 3;
  });
  if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
    obj = [].slice.call(xml.childNodes).reduce(function (text, node) {
      return text + node.nodeValue;
    }, "");
  } else if (xml.hasChildNodes()) {
    for (let i = 0; i < xml.childNodes.length; i++) {
      let item = xml.childNodes.item(i);
      let nodeName = item.nodeName;
      if (typeof obj[nodeName] == "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof obj[nodeName].push == "undefined") {
          let old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }

  return obj;
};
</script>

<style scoped>
.reservationList {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  padding: 60px 50px;
}
.card {
  width: 400px;
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  color: rgb(240, 240, 240);
  box-shadow: 0 10px 30px 5px rgba(0, 0, 0, 0.2);
}

img {
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0.9;
  transition: opacity 0.2s ease-out;
}

h2 {
  position: absolute;
  inset: auto auto 30px 30px;
  margin: 0;
  transition: inset 0.3s 0.3s ease-out;
  font-family: "Roboto Condensed", sans-serif;
  font-weight: normal;
  text-transform: uppercase;
}

p,
a {
  position: absolute;
  opacity: 0;
  max-width: 80%;
  transition: opacity 0.3s ease-out;
}

p {
  inset: auto auto 80px 30px;
}

a {
  inset: auto auto 40px 30px;
  color: inherit;
  text-decoration: none;
}

.card:hover h2 {
  inset: auto auto 220px 30px;
  transition: inset 0.3s ease-out;
}

.card:hover p,
.card:hover a {
  opacity: 1;
  transition: opacity 0.5s 0.1s ease-in;
}

.card:hover img {
  transition: opacity 0.3s ease-in;
  opacity: 1;
}

.material-symbols-outlined {
  vertical-align: middle;
}
.buttonContainer {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  width: 100%;
  padding: 40px 50px 0px 50px;
}
.spaceButton {
  width: 100px;
  height: 40px;
  border: 1px solid grey;
  border-radius: 25px;
  padding: 0 10px;
  font-size: 13px;
  font-weight: 600;
}

.spaceButton:hover {
  border: 1px solid white;
  background-color: black;
  color: white;
}

.selected {
  border: 1px solid white;
  background-color: black;
  color: white;
}
</style>
