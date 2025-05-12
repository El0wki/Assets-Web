class ToastNotificationService {
  constructor(containerClass, subContainerClass, contentClass) {
    this.containerClass = containerClass;
    this.subContainerClass = subContainerClass;
    this.contentClass = contentClass;
  }
  createContainer() {
    if (!document.querySelector(`.${this.containerClass}`)) {
      const container = document.createElement("div");
      container.classList.add(this.containerClass);
      if (container) {
        this.containerCreated = true;
        return container;
      }
    }
  }

  createSubContainer() {
    const subContainer = document.createElement("div");
    subContainer.classList.add(this.subContainerClass);
    if (subContainer) {
      this.subContainerCreated = true;
      return subContainer;
    }
  }

  createContent() {
    const content = document.createElement("div");
    content.classList.add(this.contentClass);
    if (content) {
      this.contentCreated = true;
      return content;
    }
  }

  addContainer() {
    const container = document.querySelector(`.${this.containerClass}`);
    if (!container) {
      document.body.appendChild(this.createContainer());
    }
    this.containerAdded = true;
  }

  addSubContainer() {
    if (this.containerAdded) {
      const container = document.querySelector(`.${this.containerClass}`);
      const subContainer = this.createSubContainer();
      container.appendChild(subContainer);
      this.subContainerAdded = true;
    } else {
      throw new Error("Container not created or added");
    }
  }

  addContent() {
    if (this.subContainerAdded) {
      const subContainers = document.querySelectorAll(
        `.${this.subContainerClass}`
      );
      const lastSubContainer = subContainers[subContainers.length - 1];
      if (lastSubContainer) {
        const content = this.createContent();
        lastSubContainer.appendChild(content);
      } else {
        throw new Error("No subcontainer found to add content");
      }
    } else {
      throw new Error("SubContainer not created or added");
    }
  }

  remove(time = 3000) {
    const subContainers = document.querySelectorAll(
      `.${this.subContainerClass}`
    );
    const contents = document.querySelectorAll(`.${this.contentClass}`);

    switch (true) {
      case !!subContainers: {
        subContainers.forEach((sub) => {
          setTimeout(() => {
            sub.remove();
          }, time);
        });
        this.subContainerRemoved = true;
      }

      case !!contents: {
        contents.forEach((content) => {
          setTimeout(() => {
            content.remove();
          }, time);
        });
        this.contentRemoved = true;
      }
    }
  }
}

export class ToastNotificationController {
  #toastNotificationService;
  constructor(
    containerClass = "tn--container",
    subContainerClass = "tn__sub-container",
    contentClass = "tn__content"
  ) {
    this.#toastNotificationService = new ToastNotificationService(
      containerClass,
      subContainerClass,
      contentClass
    );
  }

  createToastNotiofication() {
    this.#toastNotificationService.addContainer();
    this.#toastNotificationService.addSubContainer();
    this.#toastNotificationService.addContent();
    this.#toastNotificationService.remove();
  }
}
