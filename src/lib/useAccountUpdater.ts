import { useAuth } from "@/context/AuthContext";
import httpClient from "./httpClient";

type UpdateObject = {
  path: string;
  value: any;
  skip?: boolean;
};

const useAccountUpdater = () => {
  const { saveUserData, user } = useAuth();

  const updateAccount = (updateObj: UpdateObject): Promise<any> => {
    const { path, value, skip = false } = updateObj;
    if (!user || !path) return Promise.reject("User or path is missing");

    const updatedAccount = user

    // Remove createdAt and updatedAt fields
    delete updatedAccount.createdAt;
    delete updatedAccount.updatedAt;

    // if (!["free", "personal", "pro"].includes(updatedAccount.type)) {
    //   updatedAccount.type = "personal";
    // }



    // Set the nested property using path
    setNestedProperty(updatedAccount, path, value);

    if (skip) {
      return Promise.resolve("Update skipped");
    }

    // Return a promise to allow the caller to use .then and .catch
    return httpClient()
      .put(`/accounts/${updatedAccount._id}`, updatedAccount)
      .then((res) => {
        const { data } = res.data;
        if (data) {
          saveUserData({ ...user, account: data });
        }
        // Optional: Return the updated data
        return data;
      })
      .catch((err) => {
        console.log("Update account error: ", err);
        throw err; // Re-throw error to allow catch in the caller
      });
  };

  return updateAccount;
};
export default useAccountUpdater;

// Utility function to set nested property using path
const setNestedProperty = (obj: any, path: string, value: any) => {
  const keys = path.split(".");
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }

  current[keys[keys.length - 1]] = value;
};
