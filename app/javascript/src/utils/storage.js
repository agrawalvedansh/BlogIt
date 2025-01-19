const setToLocalStorage = ({ authToken, email, userId, userName }) => {
  localStorage.setItem("authToken", JSON.stringify(authToken));
  localStorage.setItem("authEmail", JSON.stringify(email));
  localStorage.setItem("authUserId", JSON.stringify(userId));
  localStorage.setItem("authUserName", JSON.stringify(userName));
};

const getFromLocalStorage = key => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};

const setCreateDraft = draft => {
  localStorage.setItem("/create", JSON.stringify(draft));
};

const getCreateDraft = () => {
  try {
    return JSON.parse(localStorage.getItem("/create"));
  } catch {
    return null;
  }
};

const setEditDraft = (draft, slug) => {
  localStorage.setItem(slug, JSON.stringify(draft));
};

const getEditDraft = slug => {
  try {
    return JSON.parse(localStorage.getItem(slug));
  } catch {
    return null;
  }
};

export {
  setToLocalStorage,
  getFromLocalStorage,
  setCreateDraft,
  getCreateDraft,
  setEditDraft,
  getEditDraft,
};
