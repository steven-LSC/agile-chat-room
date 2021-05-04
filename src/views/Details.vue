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
          <p @click="back" style="color: #aaa;">back</p>
          <h1>準備進入{{roomName}}聊天室</h1>
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
      style="overflow-y: hidden;"
      v-else
    >
      <header>
        <button
          class="logout"
          @click="Logout"
        >Out</button>
        <h1>Welcome, {{ state.username }}</h1>
      </header>

      <section class="chat-box">
        <div
          v-for="message in state.messages"
          :key="message.key"
          :class="(message.username == state.username ? 'message current-user' : 'message')"
        >
          <div class="message-inner">
            <div class="username">{{ message.username }}</div>
            <div class="content">{{ message.content }}</div>
          </div>
        </div>
      </section>

      <footer>
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
import { useRoute } from "vue-router";
import db from "../db";

export default {
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
    const route = useRoute();
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
    const Logout = () => {
      state.username = "";
    };

    const SendMessage = () => {
      console.log(route.params.class + " messages");
      const messagesRef = db.database().ref(route.params.class + " messages");

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
      console.log(route.params.class + " messages");
      const messagesRef = db.database().ref(route.params.class + " messages");
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
      Logout,
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
  background-color: #5269ea;

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

        h1 {
          color: #aaa;
          font-size: 28px;
          margin-bottom: 30px;
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
          background-color: #5269ea;
          border-radius: 8px;

          color: #fff;
          font-size: 18px;
          font-weight: 700;
        }

        &:focus-within {
          label {
            color: #ea526f;
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

      .logout {
        position: absolute;
        top: 15px;
        right: 15px;
        appearance: none;
        border: none;
        outline: none;
        background: none;

        color: #fff;
        font-size: 18px;
        margin-bottom: 10px;
        text-align: right;
      }

      h1 {
        color: #fff;
      }
    }

    .chat-box {
      border-radius: 24px 24px 0px 0px;
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
            border-radius: 999px;
            width: 30vh;
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
            max-width: 75%;

            .content {
              color: #fff;
              font-weight: 600;
              background-color: #5269ea;
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

          background-color: #131629;

          color: #fff;
          font-size: 18px;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
