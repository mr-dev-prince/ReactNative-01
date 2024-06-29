import {Client, ID, Account} from 'appwrite';
import Config from 'react-native-config';

const appwriteClient = new Client();

const APPWRITE_ENDPOINT: string = Config.APPWRITE_ENDPOINT!;
const APPWRITE_PROJECT_ID: string = Config.APPWRITE_PROJECT_ID!;

// console.log(APPWRITE_PROJECT_ID)


type CreateUserAccount = {
  email: string;
  password: string;
  name: string;
};

type LoginUserAccount = {
  email: string;
  password: string;
};

class AppwriteService {
  account;

  constructor() {
    appwriteClient
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);

    this.account = new Account(appwriteClient);
  }
  // create a new record of user inside of appwrite

  async createAccount({email, password, name}: CreateUserAccount) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      return userAccount;
    } catch (error) {
      console.log('CreateAccount error', error);
    }
  }

  async loginAccount({email, password}: LoginUserAccount) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log('login account error', error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log('getCurrentUser errror', error);
    }
  }

  async logOutAccount() {
    try {
      return this.account.deleteSession('current');
    } catch (error) {
      console.log('logOutUser error', error);
    }
  }
}

export default AppwriteService;
