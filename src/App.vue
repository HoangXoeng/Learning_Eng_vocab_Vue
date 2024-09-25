<template>

  <div id="app">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
    <div class="container">
      <AppHeader />
      <div class="body">
        <div class="body__content col-12">
          <!-- Nút bấm mở form thêm từ vựng -->
          <div class="body__content__add col-4" @click="showForm">
            <div class="body__content__add--top">
              <div class="body__content__add__icon">
                <i class="fa-solid fa-plus body__content__add__icon__plus"></i>
              </div>
            </div>
            <div class="body__content__add--bot">
              <span class="body__content__add__title roboto-bold">Create new one</span>
            </div>
          </div>
          <!-- End -->
          <!-- Dữ liệu các từ vuwnjgsex được trình bày ở đây -->
          <div class="body__content__item col-4" v-for="vocab in vocabList" :key="vocab.id" :id="vocab.id"
            @click="showDetail(vocab.id,vocab.img,vocab.word,vocab.meaning,vocab.example)">
            <div class="body__content__item--top">
              <img :src="vocab.img" alt="" class="body__content__item__img" />
              <span class="body__content__item__word roboto-medium">{{ vocab.word }}</span>
            </div>
            <div class="body__content__item--bot">
              <span class="body__content__item__meaning roboto-bold">{{ vocab.meaning }}</span>
            </div>
          </div>
          <!-- End -->
        </div>
      </div>
    </div>

    <!-- Modal form để thêm từ vựng -->
    <div class="add__form" v-if="isAddModalVisible">
      <form  name="frm" id="formAdd">

        <div id="close--form" @click="hideForm">
          <i class="fa-solid fa-x" id="close__form"></i>
        </div>
        <label for="word">Word</label>
        <input type="text" id="word" name="word" v-model="word" required />
        <br /><br />

        <label for="meaning">Meaning</label>
        <input type="text" id="meaning" name="meaning" v-model="meaning" required />
        <br /><br />

        <label for="example">Example</label>
        <textarea id="example" name="example" v-model="example" required></textarea>
        <br /><br />

        <input type="file" id="img_link" name="img_link" accept="image/*" @change="handleFileUpload" required />
        <br /><br />

        <button type="button" @click="addNewVocab" >Create</button>

      </form>
    </div>
    <!-- Overlay modal -->
    <div class="modal" v-if="isAddModalVisible" @click="hideForm"></div>
    <div class="modal" v-if="isDetailFormVisible" @click="hideDetailForm"></div>
    <!-- Form chi tieetr vocabulary -->
  
      <div class="detail__form" v-if="isDetailFormVisible">
        <div class="detail__form__content">
          <div class="detail__form__content__top">
            <div class="detail__form__content__top--icon" @click="hideDetailForm()">
              <i class="fa-solid fa-x"></i>
            </div>
             <div class="detail__form__content__top__delete--icon" @click="deleteItem(idInDetail)">
              <i class="fa-solid fa-trash"></i>
            </div>

           <div class="detail__form__content__img">
            <img :src="imgInDetail" alt="" id="detail__form__content__img--img">
           </div>
          </div>
          <div class="detail__form__content__bot">
            <div class="detail__form__content__bot--item">
              <span class="detail__form__content__bot--word roboto-bold">Word:</span>
              <span class="detail__form__content__bot--word-value">{{ wordInDetail }}</span>
            </div>
            <div class="detail__form__content__bot--item">
              <span class="detail__form__content__bot--meaning roboto-regular">Meaning:</span>
              <span class="detail__form__content__bot--meaning-value">{{ meaningInDetail }}</span>
            </div>
            <div class="detail__form__content__bot--item">
              <span class="detail__form__content__bot--example roboto-regular">Example:</span>
              <span class="detail__form__content__bot--example-value">{{ exampleInDetail }}</span>
            </div>
          </div>
        </div>
      </div>
    <!-- end -->
  </div>
</template>
<!-- Vieets script -->
<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
import AppHeader from './components/AppHeader.vue'
// Khai báo các biến reactive/ref
const word = ref("");
const meaning = ref("");
const example = ref("");
const imgLink = ref(null);
var isAddModalVisible = ref(false);
const vocabList = ref([]);
var isDetailFormVisible = ref(false);

const idInDetail = ref("");
const imgInDetail = ref("");
const wordInDetail = ref("");
const meaningInDetail = ref("");
const exampleInDetail = ref("");



const showDetail = (id,img,word,meaning,example) => {
  isDetailFormVisible.value = true;
  wordInDetail.value = word;
  idInDetail.value = id;
  imgInDetail.value = img;
  meaningInDetail.value = meaning;
  exampleInDetail.value = example;
}
const hideDetailForm = () =>{
  isDetailFormVisible.value = false;
}
var refreshPage = () => {
      window.location.reload();
    }
// Hiển thị form thêm từ vựng
var showForm = () => {
  isAddModalVisible.value = true;
};
// Ẩn form thêm từ vựng
var hideForm = () => {
  isAddModalVisible.value = false;
};
// Xử lý khi upload hình ảnh
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imgLink.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// Gửi dữ liệu từ vựng lên server
const addNewVocab = () => {
  var opt = {
    url: "http://localhost:3000/vocabularys",
    method: "post",
    data: {
      word: word.value,
      meaning: meaning.value,
      example: example.value,
      img: imgLink.value,
    },
  };
  axios(opt)
    .then(function (data_res) {
      console.log(data_res);
      if (data_res.status == 201) console.log("Add data successfully");
    })
    .catch(function (ex) {
      console.log(ex);
    });
    // ẩn forrm
    isAddModalVisible.value = false;
    // refresh lại trang web
   
    refreshPage()
};
// Hàm lấy dữ liệu từ vựng từ server bằng fetch
// const vocabApi = "http://localhost:3000/vocabularys";
// const getVocabulary = async () => {
//   try {
//     const response = await fetch(vocabApi);
//     const vocabs = await response.json();
//     vocabList.value = vocabs;
//   } catch (error) {
//     console.error("Lỗi khi lấy dữ liệu từ vựng:", error);
//   }
// };

  const deleteItem = (id) => {
    console.log("Deleting"+id)
    axios
    .delete(`http://localhost:3000/vocabularys/${id}`)
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        // Xóa phần tử khỏi DOM
        // document.getElementById(vocabId).remove();
        alert("Delete item complete");
      }
    })
    .catch((error) => {
      console.error("Error deleting item:", error);
      alert("An error occurred while deleting the item.");
    });
    refreshPage();
  }






  onMounted( async () => {
     try {
        const response = await axios.get("http://localhost:3000/vocabularys")
        vocabList.value = response.data;
     } catch (error) {
      console.log("Error:", error);
     }
  });

</script>
<!-- CSS viết ở đây -->
<style>
/* Body */
.body {
  margin-top: 88px;
}


.body__content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 40px;
}

.body__content__add,
.body__content__item {
  cursor: pointer;
}

.body__content__add--top,
.body__content__item--top {
  width: 241px;
  background-color: #20b2aa;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.body__content__add__icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #b4d980;
  display: flex;
  justify-content: center;
  align-items: center;
}

.body__content__add__icon__plus {
  font-size: 25px;
  color: #54712D;
}

.body__content__add--bot,
.body__content__item--bot {
  width: 241px;
  height: 37px;
  box-shadow: 0 10px 10px -5px rgba(0, 0, 0, 0.3);
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  text-align: center;
  line-height: 37px;
}

.body__content__item--top {
  /* justify-content: center; */
  position: relative;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.body__content__item__word {
  font-size: 15px;
  color: rgb(5, 5, 5);
  position: absolute;
  bottom: 6px;
}

.body__content__item--bot {
  flex-wrap: wrap;
}

.body__content__item__meaning {
  color: #888888;
  font-weight: 15px;
}



form[name="frm"] {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  /* display: none; */
  z-index: 2;

}


form[name="frm"] label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 14px;
  /* color: #333; */
  color: #2071B2;
}


form[name="frm"] input[type="text"],
form[name="frm"] input[type="file"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px;
  background-color: white;
}

textarea {
  background-color: white;
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px;
  resize: vertical;
}


form[name="frm"] button {
  width: 100%;
  padding: 10px;
  background-color: #20b2aa;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

form[name="frm"] button:hover {
  background-color: #45a049;
}

#close__form {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.body__content__item__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}



.detail__form {
  width: 100%;
  max-width: 500px;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  /* display: none; */
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  z-index: 2;

}

.detail__form__content {
  width: 100%;
  position: relative;
}

.detail__form__content__top {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.detail__form__content__top--icon {
  font-size: 20px;
  color: #007bff;
  margin-right: 10px;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}

.detail__form__content__img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  background-color: #20b2aa;
  margin-top: 25px;
}

#detail__form__content__img--img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail__form__content__top--title {
  font-size: 24px;
  font-weight: 700;
  color: #333;
}

.detail__form__content__bot {
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.detail__form__content__bot--word,
.detail__form__content__bot--meaning,
.detail__form__content__bot--example {
  margin: 10px 0;
}

.detail__form__content__bot--word {
  font-size: 20px;
  color: #333;
}

.detail__form__content__bot--meaning {
  font-size: 18px;
  color: #555;
}

.detail__form__content__bot--example {
  font-size: 16px;
  color: #777;
  font-style: italic;
}

.detail__form__content__top__delete--icon {
  position: absolute;
  top: 0;
  font-size: 15px;
  cursor: pointer;
}

/* Reset  css */
* {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

body {
  line-height: 1;
}

ol,
ul {
  list-style: none;
}

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

.container,
body {
  position: relative;
}

/* Setup Roboto font */
.roboto-thin {
  font-family: "Roboto", sans-serif;
  font-weight: 100;
  font-style: normal;
}

.roboto-light {
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-style: normal;
}

.roboto-regular {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.roboto-medium {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-style: normal;
}

.roboto-bold {
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-style: normal;
}

.roboto-black {
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  font-style: normal;
}

.roboto-thin-italic {
  font-family: "Roboto", sans-serif;
  font-weight: 100;
  font-style: italic;
}

.roboto-light-italic {
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-style: italic;
}

.roboto-regular-italic {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-style: italic;
}

.roboto-medium-italic {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-style: italic;
}

.roboto-bold-italic {
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-style: italic;
}

.roboto-black-italic {
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  font-style: italic;
}

.col-12 {
  width: 1170px;
  margin: auto;
}

.col-4 {
  width: calc(1170 / 4);
  margin: auto;
}



.modal {
  /* display: none; */
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
