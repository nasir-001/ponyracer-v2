function isOldEnough(value: number) {
  return value <= new Date().getFullYear() - 18;
}

export { isOldEnough };
