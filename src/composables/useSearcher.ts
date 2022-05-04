import {reactive, watch} from "vue";
import {SEARCH} from "@/api";

interface ResModel {
    id: number,
    title: string,
    ctx: string,
    author: string
}

interface ResponseModel {
    head: any,
    searchResults: Array<ResModel>
}


export const useSearcher = () => {

    const search = reactive<{ input: string, res: Array<ResModel>, ctxLoad: boolean }>({
        input: '',
        res: [],
        ctxLoad: false
    })

    const searchDelay = (callback: Function, delay: number = 100) => {
        let timer: any = ''
        return (nv: any) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                callback(nv);
            }, delay);
        };
    }

    watch(
        () => search.input,
        searchDelay((value: string) => {
            if (search.input === "") return
            search.ctxLoad = true
            SEARCH({input: value}).then((it: ResponseModel) => {
                if (value === search.input) {
                    search.ctxLoad = false
                    search.res = it.searchResults
                }
            })
        })
    )

    return { search }

}