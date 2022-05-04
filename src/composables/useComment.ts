import {GET_COMMENT} from "@/api";
import {ref, UnwrapRef} from "vue";

export interface CommentModel {
    id: number,
    commentId: number,
    name: string,
    ctx?: string,
    avatar: string,
    time: string,
    reply: CommentModel[]
}


export const useComment = (comments: UnwrapRef<CommentModel[]>) => {

    const commentLoader = ref<boolean>(false)

    const getCommentById = async (id: number) => {
        commentLoader.value = true
        GET_COMMENT({id})
            .then((it: any) => {
                comments.splice(0, comments.length)
                it.comments.forEach((comment: CommentModel) => comments.push(comment))
            }).finally(() => commentLoader.value = false)
    }


    return {
        getCommentById,
        commentLoader
    }
}