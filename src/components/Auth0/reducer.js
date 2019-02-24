const initialState = {
  id: null,
  role: null,
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...action.payload }
    default:
      return state
  }
}

export default auth
