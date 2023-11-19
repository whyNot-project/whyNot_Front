import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import router from '@/router';
import axios from 'axios';
import http from '@/util/http-commons';

export const useArticleStore = defineStore('article', () => {

    //article 리스트
    const articleList = ref({})

    const getArticleList = function (){
        console.log("아티클 전체 가져오기")
        http.get('article')
        .then((res) =>{
            articleList.value = res.data
            console.log(articleList.value)
        })
    }

    return { articleList, getArticleList }
})

