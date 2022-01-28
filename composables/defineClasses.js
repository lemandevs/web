import { computed } from 'vue'

const getClassString = ({
  name,
  type,
  value,
  alias,
  separator,
  class: clazz,
}) => {
  const buildClass = (value) => {
    return `${alias}${separator}${
      clazz.useName ? `${name}${separator}` : ''
    }${value}`
  }

  if (value) {
    switch (type) {
      case Array:
        return buildClass(value.join(separator))
      case String:
      case Number:
        return buildClass(value)
      case Boolean:
      default:
        return buildClass(name)
    }
  }
}

export default function (alias, options = { separator: '_' }) {
  const instance = getCurrentInstance()
  const propsDefinition = instance.propsOptions[0]
  const props = instance.props
  return computed(() => [
    alias,
    ...Object.entries(propsDefinition).reduce(
      (classes, [name, prop]) => [
        ...classes,
        ...(prop.class && props[name]
          ? [
              getClassString({
                name,
                alias,
                type: prop.type,
                class: prop.class,
                value: props[name],
                separator: options.separator,
              }),
            ]
          : []),
      ],
      []
    ),
  ])
}
