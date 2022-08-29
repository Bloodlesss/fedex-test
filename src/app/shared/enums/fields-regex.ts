export class FieldsRegex {
  Names:RegExp=/^[A-Za-z][A-Za-z ]{2,17}$/
  email:RegExp=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,10}$/
  password:RegExp=/(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/
}
