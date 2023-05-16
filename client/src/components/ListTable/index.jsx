import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

class index extends Component {
  constructor(props) {
    super(props);
  }

  handleDeleteUser = async (userId) => {
    this.props.deletedUser(userId);
  };

  render() {
    return (
      <>
        <div className="my-5 mx-7 flex justify-between items-center">
          <h1 className="text-3xl font-medium">Users List</h1>

          <Link href="/add-user">
            <button
              type="button"
              className="focus:outline-none text-white bg-green-600  hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Add User
            </button>
          </Link>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-5">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Gender
                </th>
                <th scope="col" className="px-6 py-3">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  City
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            {this.props.allUsers.length > 0 && (
              <tbody>
                {this.props.allUsers.map((user, idx) => (
                  <tr
                    key={`${user}_${idx}`}
                    className={`${
                      idx > 0 && idx % 2 !== 0
                        ? ` bg-gray-50 dark:bg-gray-800`
                        : `bg-white  dark:bg-gray-900 `
                    } border-b dark:border-gray-700`}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {`${user.fname} ${user.lname}`}
                    </th>
                    <td className="px-6 py-4">{user.gender}</td>
                    <td className="px-6 py-4">{user.contact}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.city}</td>
                    <td className="px-6 py-4">{user.address}</td>
                    <td className="px-6 py-4 flex gap-3">
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        size="lg"
                        className="text-blue-600 dark:text-blue-500 hover:text-blue-700 hover:cursor-pointer"
                      />
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        size="lg"
                        onClick={() => {
                          this.handleDeleteUser(user._id);
                        }}
                        className="text-red-600 dark:text-red-500 hover:text-red-700 hover:cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
        {this.props.allUsers.length === 0 && (
          <p className="flex justify-center items-center h-96 text-xl font-medium">
            No User Found
          </p>
        )}
      </>
    );
  }
}

export default index;
