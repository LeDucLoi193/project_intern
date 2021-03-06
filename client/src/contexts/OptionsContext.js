import { createContext,useReducer,useState } from "react";
import requestAPI from "../api/requestAPI";
import {listRequests} from '../data/SideBar';
import { SET_REQUEST,REQUEST_LOADED_SUCCESS,DETAIL_REQUEST_SUCCESS,EDIT_REQUEST,GET_COMMENTS } from "../lib/constant";
import { requestReducer } from "../reducers/requestReducer";
export const OptionsContext = createContext();

const OptionsContextProvider = ({children})=>{
  const [requestState, dispatch] = useReducer(requestReducer, {
    requestLoading: false,
    request: null,
    comment:null,
    requests:[],
    detailRequest:[],
    comments:[],
  });
  
  //state 
  const [status,setStatus] = useState(-1);
  // convert number -> status
  const convertStatus = (status)=>{
    switch (status){
    
      case 0: return 'Open';
      case 1: return 'Pending';
      case 2: return 'Process';
      case 3: return "Approve";
      case 4: return "Reject";
      default: return 'All';
    }
  }
  // convert status -> number
  const convertStringToStatus = (status)=>{
    switch (status){
      case 'Open': return 0;
      case 'Pending': return 1;
      case 'Process': return 2;
      case 'Approve': return 3;
      case 'Reject': return 4;
      default: return -1;
    }
  }

  // convert number -> status
  const convertPriority = (priority)=>{
    switch (priority){
      case 0: return 'Low';
      case 1: return 'Medium';
      case 2: return 'High';
      default: return 'All';
    }
  }
  // handle convert id -> name
  const handleConvertIdToName = (id,array)=>{
    var userWithId = array.filter(user=>user.id===id);
    return userWithId
  }
  // check user in comments ?
  const checkUserInComments = (id,array,requestId)=>{
		var arr = array.filter(ele=>ele.user_id === id);
    var idComment = array.filter(ele=>ele.request_id==requestId&&ele.user_id===id);
    
    return [arr.length>0?1:0,arr.length>0?idComment[0].id:-1];
	}
  //function handle click options
  const handleClickOptions = (state)=>{
    setStatus(state);
    console.log(status);
  }
  // filter base on option
  const handleFilter = (state,requests)=>{
    var data = [...requests];
    if(state ===-1) return data;
    else {
      var res = data.filter(function(ele){
        return ele.status === state
      })
      return res;
    }
  }


  // create new request
  const createRequest = async newRequest => {
    try {
      dispatch({
        type: SET_REQUEST,
        payload: {
          requestLoading: true,
        }
      });
      const response = await requestAPI.create(newRequest);
      console.log(response)
      dispatch({
        type: SET_REQUEST,
        payload: {
          requestLoading: false,
          request: response[1],
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
  // edit request
  const editRequest = async (request,content,id,comment,status) => {
    // status == 0 -> createComment ==1 -> update
    try {
      dispatch({
        type: EDIT_REQUEST,
        payload: {
          requestLoading: true,
        }
      });
      const response = await requestAPI.edit(request);
      var response2;
      if(status == 0){
         response2 = await requestAPI.createComment(comment);
      }
      else{
         response2 = await requestAPI.editComment({content,id});
      }
      dispatch({
        type: EDIT_REQUEST,
        payload: {
          requestLoading: false,
          request: response[1],
          comment:response2[1],
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
  // get all requests 
  const getRequests = async ()=>{
    try {
      const response = await requestAPI.getAll();
      if(response){
        dispatch({
          type: REQUEST_LOADED_SUCCESS,
          payload: {
            requestLoading: false,
            requests: response,
          }
        })
        
      }
    }
    catch(error){
      console.log(error);
    }
  }
  // get comments
  const getComments = async (id)=>{
    try {
      const response = await requestAPI.getComments(id);
      if(response){
        dispatch({
          type: GET_COMMENTS,
          payload: {
            comments:response,
          }
        })
        
      }
    }
    catch(error){
      console.log(error);
    }
  }
  // get detail request base on id request
  const getDetailRequest = async (id)=>{
    try{
      const response = await requestAPI.detailRequest(id);
      if(response){
        dispatch({
          type: DETAIL_REQUEST_SUCCESS,
          payload: {
            requestLoading: false,
            detailRequest: response,
          }
        })
      }
      
    }
    catch(error){
      console.log(error);
    }
  }

  //context data 
  const optionsContextData = {
    status,
    convertStatus,
    handleClickOptions,
    convertStringToStatus,
    handleFilter,
    requestState,
    createRequest,
    editRequest,
    getRequests,
    getDetailRequest,
    convertPriority,
    getComments,
    handleConvertIdToName,
    checkUserInComments
  }

  return (
    <OptionsContext.Provider value={optionsContextData}>
      {children}
    </OptionsContext.Provider>
  )
}
export default OptionsContextProvider;