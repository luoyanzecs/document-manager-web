import {App, h, Ref, VNode} from "vue";
import { createApp } from 'vue'
import {Vue} from "vue-class-component";

export const sleep = (time: number) => {
  return new Promise((resolve, reject) => setTimeout(resolve, time))
}

export const revert = (bool:Ref<boolean>) => {
  bool.value = !bool.value
}

export const refineHtml = (htmlText: string): string => {
    htmlText.match(/>([^/]*?)<[a-z]/g)
      ?.filter(it => it.substring(1, it.length - 2).trim() !== '')
      .forEach(it => {
        htmlText = htmlText.replace(it, `><p>${ it.substring(1, it.length-2).trim() }</p>${it.substring(it.length-2)}`)
      })
  return htmlText
}

export const toVnode = (htmlText: string): VNode => {

    return h('h1', {}, 'test')
}

export const htmlToJson = (dom: any) => {
    document.createElement('div')
}

export const domToJson = (dom: any): any => {
    const tag: any = {}
    tag['tagName'] = dom.tagName
    tag['children'] = []
    for(let i = 0; i< dom.children.length; i++){
        tag['children'].push(domToJson(dom.children[i]))
    }
    for(let i = 0; i< dom.attributes.length;i++){
        const attr =  dom.attributes[i]
        tag['@'+attr.name] = attr.value
    }
    return tag
}