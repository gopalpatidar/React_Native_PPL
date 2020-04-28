export const ADD_ITEM = "ADDITEM";
export const P_HOME = "PHOME"

export const addItem = data => {
  return {
    type: ADD_ITEM,
    data:data
  };
};

export const pHome =data=>{
  return {
    type:P_HOME,
    data:data
  }
}
