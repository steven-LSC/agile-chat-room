<template>
  <base-layout>
    <div
    class="view login"
    v-if="state.username === '' || state.username === null"
  >
    <form
      class="login-form"
      @submit.prevent="Login"
    >
      <div class="form-inner">
        <p @click="back">重選</p>
        <h1>進入{{roomName}}聊天室</h1>
        <label for="username">暱稱</label>
        <input
          type="text"
          v-model="inputUsername"
        />
        <input
          type="submit"
          value="Go"
        />
      </div>
    </form>
  </div>

  <div
    class="view chat"
    ref="infoBox"
    v-else
  >
    <header>
      <h1>Welcome, {{ state.username }}</h1>
    </header>

    <section class="chat-box">
      <div
        v-for="message in state.messages"
        :key="message.key"
        :class="(message.username == state.username ? 'message current-user' : 'message other-user')"
      >
        <div class="message-inner">
          <div class="username">{{ message.username }}</div>
          <div class="content">{{ message.content }}</div>
        </div>
      </div>
    </section>

    <footer>
      <p @click="out">Out</p>
      <form @submit.prevent="SendMessage">
        <input
          type="text"
          v-model="inputMessage"
          placeholder="Write a message..."
        />
        <input
          type="submit"
          value="Send"
        />
      </form>
    </footer>
  </div>
  </base-layout>
  
</template>

<script>
import { reactive, onMounted, ref } from "vue";
import db from "../db";
import BaseLayout from './BaseLayout.vue';

export default {
  components: { BaseLayout },
  computed:{
    roomName(){
      const map = {
        workout:"運動",
        date: "約會",
        movie: "電影"
      }
      return map[this.$route.params.class];
    }
  },
  setup() {
    const inputUsername = ref("");
    const inputMessage = ref("");
    const state = reactive({
      username: "",
      messages: [],
    });
    function back(){
      window.history.go(-1);
    }

    const Login = () => {
      if (inputUsername.value != "" || inputUsername.value != null) {
        state.username = inputUsername.value;
        inputUsername.value = "";
      }
    };

    const out = () => {
      state.username = "";
    };

    const SendMessage = () => {
      const messagesRef = db.database().ref("messages");

      if (inputMessage.value === "" || inputMessage.value === null) {
        return;
      }

      const message = {
        username: state.username,
        content: inputMessage.value,
      };

      messagesRef.push(message);
      inputMessage.value = "";
    };

    onMounted(() => {
      const messagesRef = db.database().ref("messages");

      messagesRef.on("value", (snapshot) => {
        const data = snapshot.val();
        let messages = [];

        Object.keys(data).forEach((key) => {
          messages.push({
            id: key,
            username: data[key].username,
            content: data[key].content,
          });
        });
        state.messages = messages;
      });
    });

    return {
      inputUsername,
      Login,
      state,
      inputMessage,
      SendMessage,
      out,
      back
    };
  },
};
</script>

<style lang="scss">
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.view {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: #1e59c7;

  &.login {
    align-items: center;
    .login-form {
      display: block;
      width: 100%;
      padding: 15px;

      .form-inner {
        display: block;
        background-color: #fff;
        padding: 50px 15px;
        border-radius: 16px;
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);

        p{
          color: rgb(88, 87, 87);
          // text-align: center;
        }

        h1 {
          color: rgb(88, 87, 87);
          font-size: 28px;
          margin-bottom: 30px;
          text-align: center;
        }

        label {
          display: block;
          margin-bottom: 5px;
          color: #aaa;
          font-size: 16px;
          transition: 0.4s;
        }

        input[type="text"] {
          appearance: none;
          border: none;
          outline: none;
          background: none;

          display: block;
          width: 100%;
          padding: 10px 15px;
          border-radius: 8px;
          margin-bottom: 15px;

          color: #333;
          font-size: 18px;

          box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
          background-color: #f3f3f3;

          transition: 0.4s;

          &::placeholder {
            color: #888;
            transition: 0.4s;
          }
        }

        input[type="submit"] {
          appearance: none;
          border: none;
          outline: none;
          background: none;

          display: block;
          width: 100%;
          padding: 10px 15px;
          background-color: #1e59c7;
          border-radius: 8px;

          color: #fff;
          font-size: 18px;
          font-weight: 700;
        }

        &:focus-within {
          label {
            color: #db4a4a;
          }

          input[type="text"] {
            background-color: #fff;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);

            &::placeholder {
              color: #666;
            }
          }
        }
      }
    }
  }

  &.chat {
    flex-direction: column;

    header {
      position: relative;
      display: block;
      width: 100%;
      padding: 50px 30px 10px;
      
      h1 {
        color: #fff;
        text-align: center;
      }
    }

    .chat-box {
      border-radius: 12px 12px 0px 0px;
      background-color: #fff;
      box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
      flex: 1 1 100%;
      padding: 30px;

      .message {
        display: flex;
        margin-bottom: 15px;
        
        .message-inner {
          .username {
            color: #888;
            font-size: 16px;
            margin-bottom: 5px;
            padding-left: 15px;
            padding-right: 15px;
          }

          .content {
            display: inline-block;
            padding: 10px 20px;
            background-color: #f3f3f3;
            border-radius: 10px;
            color: #333;
            font-size: 18px;
            line-height: 1.2em;
            text-align: left;
          }
        }

        &.current-user {
          margin-top: 30px;
          justify-content: flex-end;
          text-align: right;

          .message-inner {
            max-width: 100%;
            .content {
              max-width: 100%;
              color: #fff;
              font-weight: 600;
              background-color: #1e59c7;
            }
          }
        }

        &.other-user {
          text-align: left;
          .message-inner {
            max-width: 100%;
            .content {
              max-width: 100%;
            }
          }
        }

      }
    }

    footer {
      position: sticky;
      bottom: 0px;
      background-color: #fff;
      padding: 30px;
      box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);

      p{
          width: 15%;
          text-align: center;
          margin-bottom:10px;
          background-color: #363434;
          color: #fff;
          font-size: 18px;
          border-radius: 5px;
          font-weight: 700;
      }

      form {
        display: flex;

        input[type="text"] {
          flex: 1 1 100%;

          appearance: none;
          border: none;
          outline: none;
          background: none;

          display: block;
          width: 100%;
          padding: 10px 15px;
          border-radius: 8px 0px 0px 8px;

          color: #333;
          font-size: 18px;

          box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
          background-color: #f3f3f3;

          transition: 0.4s;

          &::placeholder {
            color: #888;
            transition: 0.4s;
          }
        }

        input[type="submit"] {
          appearance: none;
          border: none;
          outline: none;
          background: none;

          display: block;
          padding: 10px 15px;
          border-radius: 0px 8px 8px 0px;

          background-color: #363434;

          color: #fff;
          font-size: 18px;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
