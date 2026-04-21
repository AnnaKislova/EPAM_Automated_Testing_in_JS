import ProfileComponent from '../components/profileComponent';

class ProfilePage {
  constructor(page) {
    this.page = page;
    this.profile = new ProfileComponent(page);
  }
}

export default ProfilePage;
