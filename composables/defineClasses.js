import { computed } from 'vue'

const classDefinitionToString = ({ name, type, value }) => {
  if (value) {
    switch (type) {
      case String:
      case Number:
        return value
      case Boolean:
      default:
        return name
    }
  }
}

export default function (alias, options = { separator: '_' }) {
  const instance = getCurrentInstance()
  const propsDefinition = instance.propsOptions[0]
  const props = instance.props
  return computed(() => [
    alias,
    ...Object.entries(propsDefinition)
      .map(([name, { class: _class, type }]) => ({
        name,
        type,
        class: _class,
        value: props[name],
      }))
      .filter(({ class: _class, value }) => _class && value)
      .map(({ name, type, value }) =>
        [alias, classDefinitionToString({ name, type, value })].join(
          options.separator
        )
      ),
  ])
}
