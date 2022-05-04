import {BaseResponse} from "@/main";
import {reactive, ref, Ref} from "vue";
import {CREATE_FILE, GET_COMMENT, GET_FILE, UPDATE_FILE} from "@/api";
// @ts-ignore
import { json2html, html2json } from "html2json"
import {emitNotice, transformTime} from "@/tool/utils";
import { toRequest } from '@/tool/docConverter';
import {CommentModel, useComment} from "@/composables/useComment";
import { AttachModel } from "@/composables/useAttach";

interface FileModel {
    editor: string,
    lastEditTime: string,
    fileContent: string,
    attaches?: AttachModel[]
}

interface ResponseModel extends BaseResponse{
    fileInfo: FileModel,
    rootAttr: Record<string, string>
}


const APIRES = reactive<{ fileInfo: FileModel | undefined, comments: CommentModel[]}>({
    fileInfo: undefined,
    comments: []
})

const chooseFileId: Ref<number> = ref(0)

export const useDoc = () => {

    const FILE_LOADERS = reactive<{
        isEditorShow: boolean, isCtxLoad: boolean,
        isCreateFileLoad: boolean, isShowCreateBtnDailog: boolean,
        isUpdateFileLoad: boolean, isShowSearchBtnDailog: boolean
    }>({
        isEditorShow: false,
        isCtxLoad: false,
        isCreateFileLoad: false,
        isShowCreateBtnDailog: false,
        isUpdateFileLoad: false,
        isShowSearchBtnDailog: false
    })

    const newFile = reactive<{ isDir: boolean, name: string, parentDirId: number}>({
        isDir: false,
        name: '',
        parentDirId: 1
    })

    let rootAttr: Record<string, string>;

    const { commentLoader, getCommentById } = useComment(APIRES.comments)

    const selectFileHandler = (param: any) => {
        FILE_LOADERS.isEditorShow = false
        FILE_LOADERS.isCtxLoad  = true
        chooseFileId.value = param.id
        GET_FILE({ id: param.id }).then((it: ResponseModel) => {
            rootAttr = it.rootAttr
            APIRES.fileInfo = it.fileInfo
            APIRES.fileInfo.fileContent = json2html(JSON.parse(APIRES.fileInfo.fileContent))
            APIRES.fileInfo.attaches
                ?.forEach((it: AttachModel) => it.isAttachDeleting = false)
        }).finally(() => FILE_LOADERS.isCtxLoad = false)

        getCommentById(param.id)

    }


    const createFile = (username: string, buId: number, onSuccess: Function, arg: string) => {
        if (newFile.name === '') {
            emitNotice({type: 2, message: '文件名不能为空'})
            return
        }
        FILE_LOADERS.isCreateFileLoad = true
        CREATE_FILE({
            title: newFile.name,
            bu: buId,
            isDir: newFile.isDir,
            parentId: newFile.parentDirId
        }).then((it: { fileId: number }) => {
            APIRES.fileInfo = {
                editor: username,
                fileContent: '',
                lastEditTime: transformTime()
            }
            chooseFileId.value = it.fileId
            onSuccess(arg)
            emitNotice({type: 1, message: '创建成功'})
        }).finally(() => FILE_LOADERS.isCreateFileLoad = FILE_LOADERS.isShowCreateBtnDailog = false)

    }

    const edit = () => {
        if (APIRES.fileInfo === undefined) {
            emitNotice({ type: 3, message: '当前没有可编辑的文件' })
            return
        }
        if (FILE_LOADERS.isEditorShow) {
            FILE_LOADERS.isUpdateFileLoad = true
            UPDATE_FILE({
                fileId: chooseFileId.value,
                ...toRequest(html2json(APIRES.fileInfo.fileContent), rootAttr)
            })
                .then(() => emitNotice({type: 1, message: '更新成功'}))
                .finally(() => FILE_LOADERS.isUpdateFileLoad = FILE_LOADERS.isEditorShow = false)
        } else {
            FILE_LOADERS.isEditorShow = true
        }
    }

    const searchDirectHander = (item: any) => {
        FILE_LOADERS.isShowSearchBtnDailog = !FILE_LOADERS.isShowSearchBtnDailog
        chooseFileId.value = item.id
        selectFileHandler({ id: item.id })
    }


    return {
        APIRES,
        chooseFileId,
        FILE_LOADERS,
        selectFileHandler,
        newFile,
        createFile,
        edit,
        commentLoader,
        searchDirectHander
    }

}














