import { Feature, Icon, SysIcon } from 'vx-front'
import {
    Stack,
    useMantineTheme,
    NumberInput,
    ColorSwatch,
    NativeSelect,
    Switch,
    Checkbox,
    Group,
    Divider,
    Space,
    ScrollArea,
    Button,
} from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'

function ThemeSettings() {
    const colorScheme = useColorScheme()
    const theme = useMantineTheme()
    const { state, setStateItem } = Feature.Use.State()
    const data = Feature.Use.Data()

    return (
        <Stack h="100%">
            <ScrollArea h="100%">
                <Stack
                    h="100%"
                    justify="flex-start"
                    align="center"
                    gap={16}
                    style={{ padding: '32px 10%' }}
                >
                    <SysIcon iconName="gnome-settings-theme" size={48} />
                    <Space h="xl" />
                    <NumberInput
                        label="UI Scale"
                        description="Set the display scale of the Vixen Sell UI"
                        value={state.vx_ui_scale}
                        onChange={(value) => setStateItem('vx_ui_scale', value)}
                        decimalScale={2}
                        fixedDecimalScale
                        min={0.5}
                        max={5}
                        step={0.05}
                        w="100%"
                    />
                    <Divider my="md" w="100%" />
                    <Group grow w="100%" gap={64}>
                        <Group justify="space-between">
                            <Checkbox
                                label="Color scheme"
                                description="Use a custom Vixen Shell color scheme"
                                variant="outline"
                                checked={Boolean(state.vx_ui_color_scheme)}
                                onChange={() => {
                                    setStateItem(
                                        'vx_ui_color_scheme',
                                        (prevValue) =>
                                            prevValue === null
                                                ? colorScheme
                                                : null
                                    )
                                }}
                            />
                            <Switch
                                onLabel={<Icon iconName="sun" size={16} />}
                                offLabel={<Icon iconName="moon" size={16} />}
                                checked={
                                    state.vx_ui_color_scheme === 'dark'
                                        ? false
                                        : true
                                }
                                onChange={() =>
                                    setStateItem(
                                        'vx_ui_color_scheme',
                                        (prevValue) =>
                                            prevValue === 'dark'
                                                ? 'light'
                                                : 'dark'
                                    )
                                }
                                style={{
                                    display: state.vx_ui_color_scheme
                                        ? 'unset'
                                        : 'none',
                                }}
                                size="lg"
                            />
                        </Group>
                        <NativeSelect
                            label="Color Theme"
                            description="Set the Vixen Shell theme color"
                            data={Object.keys(theme.colors)}
                            value={theme.primaryColor}
                            onChange={(event) =>
                                setStateItem(
                                    'vx_ui_color',
                                    event.currentTarget.value
                                )
                            }
                            rightSection={
                                <ColorSwatch color={theme.primaryColor} />
                            }
                            w="100%"
                        />
                    </Group>
                    <Divider my="md" w="100%" />
                    <Group grow w="100%" gap={64}>
                        <Group justify="center" gap={32}>
                            <Icon iconName="address-book" size={32} />
                            <Icon iconName="cactus" size={32} />
                            <Icon iconName="file-py" size={32} />
                            <Icon iconName="infinity" size={32} />
                        </Group>
                        <NativeSelect
                            label="Icon style"
                            description="Set Vixen Shell icon style"
                            data={[
                                'thin',
                                'light',
                                'regular',
                                'bold',
                                'duotone',
                            ]}
                            value={state.vx_ui_icons}
                            onChange={(event) =>
                                setStateItem(
                                    'vx_ui_icons',
                                    event.currentTarget.value
                                )
                            }
                            w="100%"
                        />
                    </Group>
                    <Divider my="md" w="100%" />
                    <Group grow w="100%" gap={64}>
                        <NativeSelect
                            label="Font family"
                            description="Set the Vixen Shell font family"
                            data={[
                                'default',
                                ...(data.get('fonts', {
                                    name: 'available_fonts',
                                }) || []),
                            ]}
                            value={state.vx_ui_font_family || 'default'}
                            onChange={(event) => {
                                if (event.currentTarget.value === 'default') {
                                    setStateItem('vx_ui_font_family', null)
                                } else {
                                    setStateItem(
                                        'vx_ui_font_family',
                                        event.currentTarget.value
                                    )
                                }
                            }}
                            w="100%"
                        />
                        <NativeSelect
                            label="Monospace font family"
                            description="Set the Vixen Shell monospace font family"
                            data={[
                                'default',
                                ...(data.get('monospace_fonts', {
                                    name: 'available_fonts',
                                    args: [true],
                                }) || []),
                            ]}
                            value={
                                state.vx_ui_font_family_monospace || 'default'
                            }
                            onChange={(event) => {
                                if (event.currentTarget.value === 'default') {
                                    setStateItem(
                                        'vx_ui_font_family_monospace',
                                        null
                                    )
                                } else {
                                    setStateItem(
                                        'vx_ui_font_family_monospace',
                                        event.currentTarget.value
                                    )
                                }
                            }}
                            w="100%"
                        />
                    </Group>
                </Stack>
            </ScrollArea>
            <Group justify="center" style={{ padding: '32px 10%' }}>
                <Button variant="outline">Restore</Button>
                <Button variant="outline">Save</Button>
            </Group>
        </Stack>
    )
}

export default ThemeSettings
