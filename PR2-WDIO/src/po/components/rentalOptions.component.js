class RentalOptionsComponent {
  get slider() {
    return $('.ngx-slider-pointer-min');
  }

  get unitPriceEl() {
    return $('[data-test="unit-price"]');
  }

  get totalPriceEl() {
    return $('#total-price');
  }

  async getUnitPrice() {
    const unitPrice = parseFloat(await this.unitPriceEl.getText());
    return unitPrice;
  }

  async getTotalPrice() {
    const totalPrice = parseFloat(await this.totalPriceEl.getText());
    return totalPrice;
  }

  async setDuration() {
    await this.slider.dragAndDrop({ x: 94, y: 0 });
  }

  async getSliderValue() {
    return this.slider.getAttribute('aria-valuetext');
  }
}

export default RentalOptionsComponent;
