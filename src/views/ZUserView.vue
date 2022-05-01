<template>
  <z-aside>
    <template #right>
      <z-select class="bg-blue-500 rounded-2xl text-white min-w-4 py-2 pl-4 text-sm"
                v-model:value="bu" :options="buList.map(it => ({value: it.buId, name: it.name}))"/>
    </template>
    <template #context>
      <div class="m-4 text-lg tracking-wide font-medium text-gray-800 dark:text-white">文件目录</div>
      <div class="overflow-auto flex-1">
        <svg v-if="LOADER.isMenuLoad" class="text-gray-500 w-8 h-8 animate-spin mx-auto mt-16"
             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <z-tree v-else class="pb-8" :catalogue="APIRES.menuItems" :choose-id="chooseFileId"
                @select-file="selectFileHandler"/>
      </div>
    </template>
  </z-aside>
  <div class="h-screen flex-grow flex flex-col">
    <Header>
      <template #tools>
        <z-head-menu>
          <z-button fill="搜索" @click="buttonClickHandler('search')"/>
          <z-button fill="新建" v-show="!LOADER.isEditorShow" @click="buttonClickHandler('newFile')"/>
          <z-button fill="附件" v-show="LOADER.isEditorShow" @click="buttonClickHandler('uploadAttach')"/>
          <input type="file" ref="selectAttachInput" style="display: none" @change="attachSelectHandler">
          <z-button :fill="editorStatus" @click="buttonClickHandler('edit')" :load-visible="LOADER.isUpdateFileLoad"/>
        </z-head-menu>
      </template>
      <template #avatar>
        <z-avatar :image="userInfo?.avatar"/>
      </template>
    </Header>
    <div class="overflow-auto flex-grow flex flex-col items-stretch">
      <template v-if="APIRES.fileInfo && LOADER.isEditorShow">
        <z-editor v-model:content="APIRES.fileInfo.fileContent"/>
        <div class="flex p-4 items-center gap-2">
          <div v-for="attach in APIRES.fileInfo.attaches" :key="attach.link" @click="deleteAttach(attach.link)"
               class="border rounded-lg h-24 w-20 bg-gray-50  pos-center pt-4 pb-2 px-2 flex flex-col gap-2"
          >
            <p class="text-xs text-gray-500 text-center flex-1">{{ attach.name }}</p>
            <svg v-if="!attach.isAttachDeleting"
                 class="cursor-pointer w-4 h-4 stroke-2 text-blue-400 transform duration-100 hover:scale-125"
                 viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor"
                    d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"></path>
            </svg>
            <svg v-else class="text-gray-500 w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
      </template>
      <template v-else>
        <div v-if="LOADER.isCtxLoad" class="animate-pulse flex flex-col gap-2 p-4 min-h-30">
          <p class="h-4 bg-gray-300 w-5/12 rounded-lg"></p>
          <template v-for="i in 4" :key="i">
            <p class="h-4 bg-gray-300 w-full rounded-lg"></p>
            <p class="h-4 bg-gray-300 w-full rounded-lg"></p>
            <p class="h-4 bg-gray-300 w-full rounded-lg"></p>
            <p class="h-4 bg-gray-300 w-7/12 rounded-lg"></p>
          </template>
        </div>
        <div v-if="APIRES.fileInfo && !LOADER.isCtxLoad" class="p-4 wrap">
          <p class="mb-1.5 text-gray-400 text-sm">上次编辑于 {{ APIRES.fileInfo.lastEditTime }} by {{
              APIRES.fileInfo.editor
            }}</p>
          <div v-html="APIRES.fileInfo.fileContent" style="min-height: 20rem"></div>
          <div class="flex py-8 items-center gap-2">
            <div v-for="attach in APIRES.fileInfo.attaches" :key="attach.link" @click="downloadAttach(attach.link)"
                 class="border rounded-lg h-24 w-20 bg-gray-50  pos-center pt-4 pb-2 px-2 flex flex-col gap-2"
            >
              <p class="text-xs text-gray-500 text-center flex-1">{{ attach.name }}</p>
              <svg class="cursor-pointer w-4 h-4 stroke-2 text-blue-400 transform duration-100 hover:scale-125"
                   viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor"
                      d="M160 832h704a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64zm384-253.696 236.288-236.352 45.248 45.248L508.8 704 192 387.2l45.248-45.248L480 584.704V128h64v450.304z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div v-if="APIRES.fileInfo" class="pb-16">
          <hr class="my-4">
          <z-comment :info="userInfo" :comments-list="APIRES.comments" :file-id=chooseFileId
                     :is-comment-load="LOADER.isCommentLoad"/>
        </div>
      </template>
    </div>
  </div>
  <transition-group name="fade">
    <z-dailog :key="1" v-show="LOADER.isShowCreateBtnDailog" v-model:click-toggle="LOADER.isShowCreateBtnDailog">
      <template #title>请确认您的信息</template>
      <template #body>
        <form action="">
          <table class="table-fixed text-gray-500 border-separate mb-4" style="border-spacing: 1rem 1rem">
            <tr>
              <td class="border-r-2 pr-2 whitespace-nowrap">文件位置</td>
              <td>
                <z-location-select class="mr-2 w-64 sm:w-96" :items="APIRES.menuItems"
                                   @select-dir="id => newFile.parentDirId = id"/>
              </td>
            </tr>
            <tr>
              <td class="border-r-2 pr-2 whitespace-nowrap"><label for="createFileName">文件名</label></td>
              <td>
                <input type="text" v-model="newFile.name" class="border rounded-lg px-2 py-1 w-72 focus:outline-none"
                       id="createFileName"
                       placeholder="输入文件名" spellcheck="false" autocomplete="off">
              </td>
            </tr>
            <tr>
              <td class="border-r-2 pr-2 whitespace-nowrap">文件夹？</td>
              <td>
                <span class="cursor-pointer text-blue-500"
                      @click="newFile.isDir = !newFile.isDir">{{ newFile.isDir ? '是' : '否' }}</span>
              </td>
            </tr>
          </table>
        </form>
      </template>
      <template #bottom>
        <z-button fill="确认" @click="buttonClickHandler('newFileConfirm')" :load-visible="LOADER.isCreateFileLoad"/>
        <z-button fill="取消" @click="LOADER.isShowCreateBtnDailog = !LOADER.isShowCreateBtnDailog"/>
      </template>
    </z-dailog>
    <z-dailog :key="2" v-show="LOADER.isShowSearchBtnDailog" v-model:click-toggle="LOADER.isShowSearchBtnDailog">
      <template #body>
        <input type="text" v-model="search.input" placeholder="查询内容" spellcheck="false"
               class="border rounded-md text-gray-500 p-2 w-full text-2xl focus:outline-none focus:ring-blue-500 focus:ring-2">
        <svg v-if="search.ctxLoad" class="text-gray-500 w-10 h-10 animate-spin mx-auto mt-8"
             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <div v-else class="flex flex-col gap-2 mt-4">
          <div v-for="item in search.res" :key="item.id" @click="searchDirectHander(item)"
               class="px-4 py-2 hover:bg-blue-400 rounded-md shadow cursor-pointer">
            <p>{{ item.title }}</p>
            <p>{{ item.ctx }}</p>
          </div>
        </div>
      </template>
    </z-dailog>
  </transition-group>
</template>

<script setup>
import {computed, onMounted, reactive, ref, watch} from 'vue'
import Header from "@/components/ZHeader.vue";
import ZHeadMenu from "@/components/ZHeadMenu";
import ZButton from "@/components/ZButton";
import ZAside from "@/components/ZAside.vue";
import ZAvatar from "@/components/ZAvatar.vue";
import ZTree from "@/components/ZTree.vue";
import ZComment from "@/components/ZComment.vue";
import ZDailog from "@/components/ZDailog";
import {
  FILE_MENU,
  GET_COMMENT,
  GET_FILE,
  UPDATE_FILE,
  CREATE_FILE,
  SEARCH,
  GET_BU,
  UPLOAD_ATTACH,
  DOWNLOAD_ATTACH,
  DELETE_ATTACH
} from "@/api";
import ZEditor from "@/components/ZEditor";
import {json2html, html2json} from "html2json"
import ZLocationSelect from "@/components/ZLocationSelect";
import {emitNotice, loadUserStore, transformTime} from "@/tool/utils";
import ZSelect from "@/components/ZSelect";
import { toRequest } from '@/tool/docConverter';


const userInfo = ref(loadUserStore())
const buList = ref([])
const bu = ref(parseInt(localStorage.getItem('bu')))

const APIRES = reactive({
  fileInfo: undefined,
  rootAttr: undefined,
  menuItems: [],
  comments: []
})
const LOADER = reactive({
  isMenuLoad: true,
  isEditorShow: false,
  isCtxLoad: false,
  isCommentLoad: false,
  isShowCreateBtnDailog: false,
  isUpdateFileLoad: false,
  isCreateFileLoad: false,
  isShowSearchBtnDailog: false,
})
const chooseFileId = ref(0)
const editorStatus = computed(() => LOADER.isEditorShow ? '更新' : '编辑')
const newFile = reactive({
  isDir: false,
  name: '',
  parentDirId: 1
})
const search = reactive({
  input: '',
  res: [],
  ctxLoad: false
})
const selectAttachInput = ref()

function attachSelectHandler(event) {
  UPLOAD_ATTACH({
    file: event.target.files[0],
    docId: chooseFileId.value
  }).then(it => {
    const attach = {
      name: it.attach.name,
      link: it.attach.link,
      isAttachDeleting: false
    }
    APIRES.fileInfo.attaches.unshift(attach)
    emitNotice({type: 1, message: '附件上传成功'})
  }).catch(() => {
    emitNotice({type: 2, message: '附件上传失败'})
  })
}

onMounted(() => {
  FILE_MENU({ bu: userInfo.value.bu }).then(it => {
    LOADER.isMenuLoad = false
    it.items.forEach(item => APIRES.menuItems.push(item))
  })
  GET_BU({}).then(it => buList.value = it.buList)
})

function searchDelay(callback, delay = 100) {
  let timer = ''
  return nv => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(nv);
    }, delay);
  };
}

watch(
    () => bu.value,
    (nv) => {
      LOADER.isMenuLoad = true
      FILE_MENU({bu: nv}).then(it => {
        LOADER.isMenuLoad = false
        APIRES.menuItems = new Array(0)
        it.items.forEach(item => APIRES.menuItems.push(item))
      })
    }
)
watch(
    () => search.input,
    searchDelay(value => {
      search.ctxLoad = true
      SEARCH({input: value}).then(it => {
        if (value === search.input) {
          search.ctxLoad = false
          search.res = it.searchResults
        }
      })
    })
)

const buttonClickHandler = (index) => {
  switch (index) {
    case 'search':
      LOADER.isShowSearchBtnDailog = true
      break
    case 'newFile':
      LOADER.isShowCreateBtnDailog = true
      break
    case 'uploadAttach':
      selectAttachInput.value.value = null
      selectAttachInput.value.click()
      break
    case 'edit': {
      if (APIRES.fileInfo === undefined) {
        emitNotice({ type: 3, message: '当前没有可编辑的文件' })
        return
      }
      if (LOADER.isEditorShow) {
        LOADER.isUpdateFileLoad = true
        UPDATE_FILE({
          fileId: chooseFileId.value,
          ...toRequest(html2json(APIRES.fileInfo.fileContent), APIRES.rootAttr)
        })
            .then(() => emitNotice({type: 1, message: '更新成功'}))
            .finally(() => LOADER.isUpdateFileLoad = LOADER.isEditorShow = false)
      } else {
        LOADER.isEditorShow = true
      }
      break
    }
    case 'newFileConfirm': {
      if (newFile.name === '') {
        emitNotice({type: 2, message: '文件名不能为空'})
        break
      }
      LOADER.isCreateFileLoad = true
      CREATE_FILE({
        title: newFile.name,
        bu: bu.value,
        isDir: newFile.isDir,
        parentId: newFile.parentDirId
      }).then(it => {
        APIRES.fileInfo = {
          editor: userInfo.value.username,
          fileContent: '',
          lastEditTime: transformTime()
        }
        chooseFileId.value = it.fileId
        buttonClickHandler('edit')
        emitNotice({type: 1, message: '创建成功'})
      }).finally(() => LOADER.isCreateFileLoad = LOADER.isShowCreateBtnDailog = false)
      break
    }
  }
}

function downloadAttach(link) {
  const attach = APIRES.fileInfo.attaches.find(it => it.link === link);
  DOWNLOAD_ATTACH({link: link})
      .then(it => {
        let url = window.URL.createObjectURL(new Blob([it]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', attach.name)
        document.body.append(link)
        link.click()
        link.parentElement.removeChild(link)
      })
}

function deleteAttach(link) {
  const attach = APIRES.fileInfo.attaches.find(it => it.link === link);
  attach.isAttachDeleting = true
  DELETE_ATTACH({attachId: link})
      .then(() => {
        APIRES.fileInfo.attaches = APIRES.fileInfo.attaches.filter(it => it.link !== link)
        emitNotice({type: 1, message: '文件删除成功'})
      })
      .finally(() => attach.isAttachDeleting = false)
}

const searchDirectHander = (item) => {
  LOADER.isShowSearchBtnDailog = !LOADER.isShowSearchBtnDailog
  chooseFileId.value = item.id
  selectFileHandler({id: item.id})
}

const selectFileHandler = (param) => {
  LOADER.isEditorShow = false
  LOADER.isCtxLoad = LOADER.isCommentLoad = true
  chooseFileId.value = param.id
  GET_FILE({id: param.id}).then(it => {
    LOADER.isCtxLoad = false
    APIRES.fileInfo = it.fileInfo
    APIRES.rootAttr = it.rootAttr
    APIRES.fileInfo.fileContent = json2html(JSON.parse(APIRES.fileInfo.fileContent))
    APIRES.fileInfo.attaches.forEach(it => it.isAttachDeleting = false)
  }).catch(() => LOADER.isCtxLoad = false)

  GET_COMMENT({id: param.id}).then(it => {
    LOADER.isCommentLoad = false
    APIRES.comments.splice(0, APIRES.comments.length)
    it.comments.forEach((comment) => APIRES.comments.push(comment))
  }).catch(() => LOADER.isCommentLoad = false)
}

</script>

<style scoped>
.fade-leave-active {
  animation: fade ease-in-out .2s reverse;
}

.fade-enter-active {
  animation: fade ease-in-out .2s;
}

@keyframes fade {
  from {
    @apply opacity-0
  }
  to {
    @apply opacity-100
  }
}

:deep(.wrap ul) {
  list-style-type: disc !important;
  margin-left: 1rem;
}

:deep(.wrap ul li) {
  list-style: disc !important;
}

:deep(.wrap ol) {
  list-style-type: decimal !important;
  margin-left: 1rem;
}

:deep(.wrap ol li) {
  list-style: decimal !important;
}

:deep(.wrap th) {
  @apply border border-gray-300 px-2 py-1 bg-gray-100
}

:deep(.wrap td) {
  @apply border border-gray-300 px-4 py-1
}

:deep(.wrap h1) { font-size: 2em; }
:deep(.wrap h2) { font-size: 1.5em; }
:deep(.wrap h3) { font-size: 1.17em; }


</style>