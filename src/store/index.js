import Vue from "vue";
import Vuex from "vuex";
import { bus } from "../main";
import { getObject, readableDate } from "../utils/helpers";

Vue.use(Vuex);

const defaultState = {
  step: 1,
  checkInDate: "",
  checkOutDate: "",
  roomType: "",
  roomView: "",
  payment: {
    cardName: "",
    cardNumber: "",
    cardMonth: "",
    cardYear: "",
    cardCvv: "",
  },
};

const savedState = getObject("state");

export const initialState = { ...defaultState, ...savedState };

export default new Vuex.Store({
  state: initialState,
  getters: {
    formattedRoom: ({ roomType, roomView }) => {
      return `${roomType}${roomView ? " / " + roomView : ""}`;
    },
    formattedDate: ({ checkInDate, checkOutDate }) => {
      const formattedCheckInDate = checkInDate
        ? readableDate(checkInDate)
        : false;
      const formattedCheckOutDate = checkOutDate
        ? readableDate(checkOutDate)
        : false;

      return `${formattedCheckInDate || ""}${
        formattedCheckOutDate ? " → " + formattedCheckOutDate : ""
      }`;
    },
    firstStepIsDone: ({ checkInDate, checkOutDate }) =>
      !!checkInDate && !!checkOutDate,
    secondStepIsDone: ({ roomType, roomView }) => !!roomType && !!roomView,
    thirdStepIsDone: ({ payment }) =>
      Object.values(payment).every((x) => x) &&
      payment.cardNumber.length === 19 &&
      payment.cardCvv.length === 3,
  },
  mutations: {
    changeStep(state, payload) {
      state.step = payload;
    },
    selectCheckInDate(state, payload) {
      state.checkInDate = payload;
    },
    selectCheckOutDate(state, payload) {
      state.checkOutDate = payload;
    },
    selectRoomType(state, payload) {
      state.roomType = payload;
    },
    selectRoomView(state, payload) {
      state.roomView = payload;
    },
    updatePayment(state, payload) {
      state.payment = payload;
    },
    checkout(state) {
      const requestData = {
        ...state,
        payment: {
          ...state.payment,
          cardNumber: parseInt(state.payment.cardNumber.replaceAll(" ", "")),
          cardMonth: parseInt(state.payment.cardMonth),
          cardYear: parseInt(state.payment.cardYear),
          cardCvv: parseInt(state.payment.cardCvv),
        },
      };
      delete requestData.step;
      console.log(requestData);
    },
    resetState(state) {
      Object.assign(state, { ...defaultState });
      Object.keys(state.payment).forEach((key) => {
        state.payment[key] = "";
      });
      bus.$emit("reset-state");
    },
  },
  actions: {},
});
