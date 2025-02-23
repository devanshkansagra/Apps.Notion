import { NotionApp } from "../../../NotionApp";
import { ElementInteractionParam } from "../../../definition/ui-kit/Element/IElementBuilder";
import { StaticSelectOptionsParam } from "../../../definition/ui-kit/Element/IStaticSelectElement";
import { Modals } from "../../../enum/modals/common/Modals";
import { InputElementDispatchAction } from "@rocket.chat/ui-kit";

export function DropDownComponent(
    {
        app,
        options,
        placeholder,
        text,
        dispatchActionConfigOnSelect,
        dispatchActionConfigOnInput,
        initialValue,
    }: {
        app: NotionApp;
        options: StaticSelectOptionsParam;
        placeholder: string;
        text: string;
        dispatchActionConfigOnSelect?: boolean;
        dispatchActionConfigOnInput?: boolean;
        initialValue?: string;
    },
    { blockId, actionId }: ElementInteractionParam
) {
    const { elementBuilder, blockBuilder } = app.getUtils();
    const dropDownOption = elementBuilder.createDropDownOptions(options);

    let dispatchActionConfig: Array<InputElementDispatchAction> = [];

    if (dispatchActionConfigOnSelect) {
        dispatchActionConfig.push(Modals.dispatchActionConfigOnSelect);
    }

    if (dispatchActionConfigOnInput) {
        dispatchActionConfig.push(Modals.dispatchActionConfigOnInput);
    }

    const inputBlock = blockBuilder.createInputBlock({
        text: text,
        element: {
            type: 'static_select',
            blockId: blockId,
            options: dropDownOption,
            appId: app.getID(),
            actionId: actionId,
            placeholder: {
                type: 'plain_text',
                text: placeholder,
            },
            dispatchActionConfig: [Modals.dispatchActionConfigOnSelect]
        },
        optional: false,
    });

    return inputBlock;
}
