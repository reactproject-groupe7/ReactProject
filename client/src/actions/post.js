import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from "./types";

import { API_ENDPOINT } from '../constants';

// Get posts
//recupère les données
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get(`${API_ENDPOINT}/api/posts`);

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

//ajout like
export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`${API_ENDPOINT}/api/posts/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: {
        id,
        likes: res.data
      }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// supprime like
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`${API_ENDPOINT}/api/posts/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: {
        id,
        likes: res.data
      }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// supprrime les articles
export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`${API_ENDPOINT}/api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id
    });

    dispatch(setAlert("Article supprimé", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Ajouter des articles
export const addPost = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post(`${API_ENDPOINT}/api/posts`, formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setAlert("Article Crée", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// get articles
export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`${API_ENDPOINT}/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Ajouter commentaire
export const addComment = (postId, formData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post(
      `${API_ENDPOINT}/api/posts/comment/${postId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert("Commentaire ajouté", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Suppression commentaire
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    await axios.delete(`${API_ENDPOINT}/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert("Commentaire supprimé", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};
