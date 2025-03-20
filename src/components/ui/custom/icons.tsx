import {
	AlertTriangle,
	ArrowDown,
	ArrowLeft,
	ArrowRight,
	ArrowUp,
	BicepsFlexed,
	Bold,
	Book,
	Calendar,
	CalendarCheck,
	ChevronDown,
	ChevronRight,
	Check,
	CheckCircle2,
	Circle,
	Dumbbell,
	Edit,
	Eye,
	Fingerprint,
	GripVertical,
	Heading3,
	Heading4,
	ImageIcon,
	ImagePlus,
	Italic,
	List,
	ListOrdered,
	Loader2,
	LogIn,
	LogOut,
	Mail,
	Moon,
	Menu,
	MoreHorizontal,
	Phone,
	Plus,
	PlusCircle,
	Rocket,
	Save,
	Search,
	Upload,
	SunMedium,
	Tag,
	Trash2,
	User,
	UserCog,
	X,
	XCircle,
	LayoutDashboard,
} from 'lucide-react'

export type IconType =
	| 'alertTriangle'
	| 'arrowDown'
	| 'arrowLeft'
	| 'arrowRight'
	| 'arrowUp'
	| 'bicepsFlexed'
	| 'bold'
	| 'book'
	| 'calendar'
	| 'calendarCheck'
	| 'check'
	| 'checkCircle'
	| 'chevronDown'
	| 'chevronRight'
	| 'circle'
	| 'dumbbell'
	| 'edit'
	| 'eye'
	| 'fingerprint'
	| 'gripVertical'
	| 'heading3'
	| 'heading4'
	| 'image'
	| 'imagePlus'
	| 'italic'
	| 'layoutDashboard'
	| 'list'
	| 'listOrdered'
	| 'loader'
	| 'logIn'
	| 'logOut'
	| 'mail'
	| 'menu'
	| 'moon'
	| 'moreHorizontal'
	| 'plus'
	| 'plusCircle'
	| 'phone'
	| 'rocket'
	| 'save'
	| 'search'
	| 'sun'
	| 'tag'
	| 'trash'
	| 'upload'
	| 'user'
	| 'userRole'
	| 'x'
	| 'xCircle'

// IconProps extends SVG attributes to allow passing all standard SVG props to icons
export type IconProps = React.SVGProps<SVGSVGElement>

const Icons = {
	alertTriangle: (props: IconProps) => <AlertTriangle {...props} />,
	arrowDown: (props: IconProps) => <ArrowDown {...props} />,
	arrowLeft: (props: IconProps) => <ArrowLeft {...props} />,
	arrowRight: (props: IconProps) => <ArrowRight {...props} />,
	arrowUp: (props: IconProps) => <ArrowUp {...props} />,
	bicepsFlexed: (props: IconProps) => <BicepsFlexed {...props} />,
	bold: (props: IconProps) => <Bold {...props} />,
	book: (props: IconProps) => <Book {...props} />,
	calendar: (props: IconProps) => <Calendar {...props} />,
	calendarCheck: (props: IconProps) => <CalendarCheck {...props} />,
	check: (props: IconProps) => <Check {...props} />,
	checkCircle: (props: IconProps) => <CheckCircle2 {...props} />,
	chevronDown: (props: IconProps) => <ChevronDown {...props} />,
	chevronRight: (props: IconProps) => <ChevronRight {...props} />,
	circle: (props: IconProps) => <Circle {...props} />,
	dumbbell: (props: IconProps) => <Dumbbell {...props} />,
	edit: (props: IconProps) => <Edit {...props} />,
	eye: (props: IconProps) => <Eye {...props} />,
	fingerprint: (props: IconProps) => <Fingerprint {...props} />,
	gripVertical: (props: IconProps) => <GripVertical {...props} />,
	heading3: (props: IconProps) => <Heading3 {...props} />,
	heading4: (props: IconProps) => <Heading4 {...props} />,
	image: (props: IconProps) => <ImageIcon {...props} />,
	imagePlus: (props: IconProps) => <ImagePlus {...props} />,
	italic: (props: IconProps) => <Italic {...props} />,
	layoutDashboard: (props: IconProps) => <LayoutDashboard {...props} />,
	list: (props: IconProps) => <List {...props} />,
	listOrdered: (props: IconProps) => <ListOrdered {...props} />,
	loader: (props: IconProps) => <Loader2 {...props} />,
	logIn: (props: IconProps) => <LogIn {...props} />,
	logOut: (props: IconProps) => <LogOut {...props} />,
	mail: (props: IconProps) => <Mail {...props} />,
	moon: (props: IconProps) => <Moon {...props} />,
	moreHorizontal: (props: IconProps) => <MoreHorizontal {...props} />,
	phone: (props: IconProps) => <Phone {...props} />,
	plus: (props: IconProps) => <Plus {...props} />,
	plusCircle: (props: IconProps) => <PlusCircle {...props} />,
	rocket: (props: IconProps) => <Rocket {...props} />,
	save: (props: IconProps) => <Save {...props} />,
	search: (props: IconProps) => <Search {...props} />,
	sun: (props: IconProps) => <SunMedium {...props} />,
	tag: (props: IconProps) => <Tag {...props} />,
	trash: (props: IconProps) => <Trash2 {...props} />,
	menu: (props: IconProps) => <Menu {...props} />,
	upload: (props: IconProps) => <Upload {...props} />,
	user: (props: IconProps) => <User {...props} />,
	userRole: (props: IconProps) => <UserCog {...props} />,
	x: (props: IconProps) => <X {...props} />,
	xCircle: (props: IconProps) => <XCircle {...props} />,
}

interface DynamicIconProps extends IconProps {
	iconName: keyof typeof Icons | IconType
}

export const Icon: React.FC<DynamicIconProps> = ({ iconName, ...props }) => {
	const IconComponent = Icons[iconName]
	if (!IconComponent) {
		return null // or return a default icon
	}
	return <IconComponent {...props} />
}
