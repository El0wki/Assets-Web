class LoadingScreenService {
  constructor(containerClass, contentClass) {
    this.containerClass = containerClass;
    this.contentClass = contentClass;
  }
  createContainer() {
    const container = document.createElement("div");
    container.classList.add(this.containerClass);
    if (container) {
      this.containerCreated = true;
      return container;
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

  addContent() {
    if (this.containerAdded) {
      const container = document.querySelector(`.${this.containerClass}`);
      const content = this.createContent();
      container.appendChild(content);
    } else {
      throw new Error("Container not created or added");
    }
  }

  remove(time) {
    if (document.querySelector(`.${this.containerClass}`)) {
      const container = document.querySelector(`.${this.containerClass}`);
      const content = document.querySelector(`.${this.contentClass}`);

      switch (true) {
        case !!container:
          setTimeout(() => {
            container.remove();
          }, time);
          this.containerRemoved = true;
          break;

        case !!content:
          setTimeout(() => {
            content.remove();
          }, time);
          this.contentRemoved = true;
          break;

        default: // Nenhum dos dois existe
          throw new Error("Nenhum elemento encontrado para remover.");
      }
    }
  }
}

export class LoadingScreenController {
  #loadingScreenService;
  constructor(containerClass = "ls--container", contentClass = "ls__content") {
    this.#loadingScreenService = new LoadingScreenService(
      containerClass,
      contentClass
    );
  }

  createLoadingScreen(time = 1700) {
    this.#loadingScreenService.addContainer();
    this.#loadingScreenService.addContent();
    this.#loadingScreenService.remove(time);
  }
}
