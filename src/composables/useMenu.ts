import {FILE_MENU} from "@/api";
import {reactive} from "vue";
import {BaseResponse} from "@/main";

interface MenuModel {
    id: number,
    title: string,
    isDir: boolean,
    children: MenuModel[]
}

interface ResponseModel extends BaseResponse{
    items: MenuModel[]
}

export const useMenu = () => {

    const menuModel = reactive<{ items: MenuModel[], loader: boolean}>({
        items: [],
        loader: true
    })

    const getMenuByBuId = (id: number): void => {
        menuModel.loader = true
        FILE_MENU({ bu: id }).then((it: ResponseModel) => {
            menuModel.items = Array(0)
            it.items.forEach(item => menuModel.items.push(item))
        }).finally(() => menuModel.loader = false)
    }

    return {
        getMenuByBuId,
        menuModel
    }
}