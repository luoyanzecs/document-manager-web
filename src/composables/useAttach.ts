import {useDoc} from "@/composables/useDoc";
import {DELETE_ATTACH, DOWNLOAD_ATTACH, UPLOAD_ATTACH} from "@/api";
import {emitNotice} from "@/tool/utils";

export interface AttachModel {
    name: string,
    link: number,
    isAttachDeleting?: boolean
}

export const useAttach = () => {

    const { APIRES, chooseFileId } = useDoc()

    const downloadAttach = (link: number) => {

        const attach: AttachModel = APIRES.fileInfo?.attaches?.find(it => it.link === link)!;
        DOWNLOAD_ATTACH({link: link})
            .then((it: any) => {
                const url: string = window.URL.createObjectURL(new Blob([it]))
                const link: HTMLAnchorElement = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.setAttribute('download', attach.name)
                document.body.append(link)
                link.click()
                link.parentElement?.removeChild(link)
            })
    }

    const attachSelectHandler = (event: any) => {
        UPLOAD_ATTACH({
            file: event?.target?.files[0],
            docId: chooseFileId.value
        }).then((it: { attach: AttachModel }) => {
            APIRES.fileInfo?.attaches?.unshift({
                name: it.attach.name,
                link: it.attach.link,
                isAttachDeleting: false
            })
            emitNotice({type: 1, message: '附件上传成功'})
        }).catch(() => {
            emitNotice({type: 2, message: '附件上传失败'})
        })
    }

    const deleteAttach = (link: number) => {
        const attach = APIRES.fileInfo?.attaches?.find(it => it.link === link)!;
        attach.isAttachDeleting = true
        DELETE_ATTACH({attachId: link})
            .then(() => {
                if (APIRES.fileInfo?.attaches) {
                    APIRES.fileInfo.attaches = APIRES.fileInfo?.attaches?.filter(it => it.link !== link)
                }
                emitNotice({ type: 1, message: '文件删除成功' })
            })
            .finally(() => attach.isAttachDeleting = false)
    }

    return {
        downloadAttach,
        attachSelectHandler,
        deleteAttach
    }

}