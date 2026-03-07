import { expect } from '@playwright/test';

class ProfileComponent {
    constructor(page) {
        this.page = page;
        this.accountTitle = page.locator('[data-test="page-title"]');
    }
    
    async verifyProfileIsOpen() {
        await this.page.waitForURL('**/account');
        await expect(this.accountTitle).toBeVisible();
    }
}  

export default ProfileComponent;
