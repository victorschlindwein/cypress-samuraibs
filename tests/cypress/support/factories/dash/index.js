import _ from 'underscore'

export const customer = {
  name: 'Rova rovaris',
  email: 'rova@rovinhas.com',
  password: 'pwd123',
  is_provider: false
}

export const provider = {
  name: 'Ramon Valdes',
  email: 'ramon@samuraibs.com',
  password: 'pwd123',
  is_provider: true
}

export const appointment = {
  hour: _.sample(['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'])
}