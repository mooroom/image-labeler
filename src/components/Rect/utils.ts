import { CanvasCoordState } from "../../modules/canvasCoordinate";

type MousePos = {
  mouseX: number;
  mouseY: number;
};

const minimum_size = 20;

export const handleResize = (
  e: React.MouseEvent,
  rectRef: React.RefObject<HTMLDivElement>,
  canvasCoordinate: CanvasCoordState
) => {
  const target = e.target as HTMLDivElement;
  const $rect = rectRef.current as HTMLDivElement;
  const boundingClientRect = $rect.getBoundingClientRect();

  const original = {
    x: boundingClientRect.left,
    y: boundingClientRect.top,
    width: boundingClientRect.width,
    height: boundingClientRect.height,
  };

  const startX = e.clientX;
  const startY = e.clientY;

  const topLeft = ({ mouseX, mouseY }: MousePos) => {
    const width = original.width - (mouseX - startX);
    const height = original.height - (mouseY - startY);

    if (width > minimum_size) {
      $rect.style.left = `${
        original.x + (mouseX - startX) - canvasCoordinate.left
      }px`;
      $rect.style.width = `${width}px`;
    }

    if (height > minimum_size) {
      $rect.style.top = `${
        original.y + (mouseY - startY) - canvasCoordinate.top
      }px`;
      $rect.style.height = `${height}px`;
    }
  };
  const topRight = ({ mouseX, mouseY }: MousePos) => {
    const width = original.width + (mouseX - startX);
    const height = original.height - (mouseY - startY);

    if (width > minimum_size) {
      $rect.style.width = `${width}px`;
    }

    if (height > minimum_size) {
      $rect.style.top = `${
        original.y + (mouseY - startY) - canvasCoordinate.top
      }px`;
      $rect.style.height = `${height}px`;
    }
  };
  const bottomRight = ({ mouseX, mouseY }: MousePos) => {
    const width = original.width + (mouseX - startX);
    const height = original.height + (mouseY - startY);

    if (width > minimum_size) {
      $rect.style.width = `${width}px`;
    }

    if (height > minimum_size) {
      $rect.style.height = `${height}px`;
    }
  };
  const bottomLeft = ({ mouseX, mouseY }: MousePos) => {
    const width = original.width - (mouseX - startX);
    const height = original.height + (mouseY - startY);

    if (width > minimum_size) {
      $rect.style.left = `${
        original.x + (mouseX - startX) - canvasCoordinate.left
      }px`;
      $rect.style.width = `${width}px`;
    }

    if (height > minimum_size) {
      $rect.style.height = `${height}px`;
    }
  };

  const resize = (e: MouseEvent) => {
    if (target.classList.contains("top-left")) {
      topLeft({ mouseX: e.clientX, mouseY: e.clientY });
    } else if (target.classList.contains("top-right")) {
      topRight({ mouseX: e.clientX, mouseY: e.clientY });
    } else if (target.classList.contains("bottom-right")) {
      bottomRight({ mouseX: e.clientX, mouseY: e.clientY });
    } else if (target.classList.contains("bottom-left")) {
      bottomLeft({ mouseX: e.clientX, mouseY: e.clientY });
    } else {
      throw new Error("please select any other resizer");
    }
  };

  const stopResize = () => {
    document.removeEventListener("mousemove", resize);
  };

  document.addEventListener("mousemove", resize);
  document.addEventListener("mouseup", stopResize);
};
