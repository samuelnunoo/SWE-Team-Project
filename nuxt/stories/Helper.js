
//  Binds function to props
const _props = (target_function) => ( {
    storybookDataInject: {
        type: Function,
        default:target_function
    }
})


const getTemplate = (component) => ({template:`<v-app dark> <${component} :storybookDataInject=storybookDataInject /> </v-app>`})
// Custom  Component and hook function

export const createTest = (component,hook) => {
    // get props 
    const props = _props(hook)

    // get template
    const template_name = component.__docgenInfo ? component.__docgenInfo.displayName : component.name 
    const template = getTemplate(template_name)
    const components = {}
    components[template_name] = component

    // return JSON 
    return {
        props,
        components,
        ...template
    }

    //
}

