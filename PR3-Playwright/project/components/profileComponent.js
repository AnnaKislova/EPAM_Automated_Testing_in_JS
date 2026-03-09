import { expect } from '@playwright/test';

class ProfileComponent {
    constructor(page) {
        this.page = page;
    }

    get accountTitle() {
        return this.page.locator('[data-test="page-title"]');
    }
    
    async verifyProfileIsOpen() {
        await this.page.waitForURL('**/account');
        await expect(this.accountTitle).toBeVisible();
    }
}  

export default ProfileComponent;
