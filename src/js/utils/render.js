import Abstract from "../view/abstract.js";

export const render = (container, child) => {
  const containerEl = getElement(container);
  const childEl = getElement(child);

  containerEl.append(childEl);

  renderChild(childEl, getChild(child, childEl));
};

const renderChild = (container, childList) => {
  if (childList) {
    childList.forEach((childItem) => {
      if (Array.isArray(childItem.element)) {
        childItem.element.forEach((el) => render(container, el));
      } else render(container, childItem);
    });
  }
};

const getElement = (container) => {
  let element = container;
  if (element._structure) element = element._structure;
  while (element.element) {
    element = element.element;
  }
  return element;
};

const getChild = (node, element) => {
  let currentNode = node._structure ? node._structure : node.element;
  // let child = node.child ? node.child.element : undefined;
  let child = node.child ? node.child : undefined;
  if (!child && currentNode) {
    while (currentNode.child) {
      if (currentNode.element === element) {
        child = currentNode.child;
        break;
      }
      currentNode = currentNode.child;
    }
  }
  return child;
};

// const renderChild = (container, child) => {
//   child.forEach((childrenObj) => {
//     if (Array.isArray(childrenObj._element)) {
//       childrenObj._element.forEach((childElement) =>
//         renderElementWhitChild(container, childElement, childrenObj._elementChildren),
//       );
//     } else renderElementWhitChild(container, childrenObj._element, childrenObj._elementChildren);
//   });
// };

// const renderElementWhitChild = (container, element, child) => {
//   render(container, element);
//   if (child) {
//     renderChild(element, child);
//   }
// };

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const createDomElement = (properties) => {
  const newElement = Object.assign(
    document.createElement(properties.tag),
    properties,
  );

  return newElement;
};

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof Abstract)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};
