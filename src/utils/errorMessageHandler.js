const errorMessageHandler = error => {
  console.log(error)
  const isMessage = error.toString().includes('message')
  return isMessage
    ? JSON.parse(error.message).message
    : error.message
}

export default errorMessageHandler;
