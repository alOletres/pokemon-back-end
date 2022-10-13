import {Connection, Query} from "promise-mysql"
import {ErrorException} from "./../utils"
import {COMMON_QUERIES} from "../constants"
import {IUser} from "./../types"

export const USER_QUERIES = {
  CREATE_USER: async (
    connection: Connection,
    {
      roles, firstname, lastname,
      address, mobile_number, email, password
    }: IUser
  ): Promise<Query<any>> => {
    try {
      if (!connection) throw new ErrorException("Unable to connect to database.")

      connection.beginTransaction()

      const response = await connection.query(
        COMMON_QUERIES.CREATE_USER, 
        [roles, firstname, lastname, address, mobile_number, email, password]
      )
      
      connection.commit()

      return response
    } catch (err) {
      connection.rollback()
      throw err
    }
  }
}