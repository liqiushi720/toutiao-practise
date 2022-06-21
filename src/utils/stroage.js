export const getItem = key => {
  const data = localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (e) {
    return data
  }
}
export const setItem = (key, values) => {
  if (typeof values === 'object') {
    values = JSON.stringify(values)
  }
  localStorage.setItem(key, values)
}

export const removeItem = key => {
  localStorage.removeItem(key)
}
