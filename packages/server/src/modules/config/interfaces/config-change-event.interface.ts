export interface ConfigChangeEvent<OldValue = any, NewValue = any> {
    path: string;
    oldValue: OldValue;
    newValue: NewValue;
}
