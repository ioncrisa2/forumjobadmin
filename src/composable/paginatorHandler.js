import {ref, computed} from "vue";

export default function paginatorHandler(){
    let page = ref(1);
    let perPage = ref(1);
    let data = ref([]);

    const getPerPage = (page) => perPage.value = page;
    const getData = (data) => data.value = data;

    const paginatedData = computed(() => 
        data.slice((page.value - 1) * perPage.value, page.value * perPage.value)
    );

    const nextPage = ()  => {
        if(page.value !== Math.ceil(data.value.length / perPage.value)){
            page.value += 1;
        }
    }

    const backPage = (numPage) => {
        if (page.value !== 1) {
            page.value -= 1
        }
    }

    const goToPage = (numPage) => page.value = numPage;

    return{
        page, perPage, data, getPerPage, getData, paginatedData, nextPage, backPage, goToPage
    };

}