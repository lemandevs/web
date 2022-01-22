import { computed } from 'vue'

const getClassString = ({ name, type, value, alias, separator }) => {
  if (value) {
    switch (type) {
      case Array:
        return `${alias}${separator}${value.join(separator)}`
      case String:
      case Number:
        return `${alias}${separator}${value}`
      case Boolean:
      default:
        return `${alias}${separator}${name}`
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
