const popups = Popup.createPopups('drop-down_menu', 'drop-down_menu__trigger', ['drop-down_menu__trigger', 'drop-down_menu__item'], 'drop-down_menu--opened')
Popup.createPullToClosePopups(popups, document)

// lang
Lang.createLang('en', [
	['header-title', 'Title eng'],
	['header-menu-title', 'Main page eng'],
	['header-menu-item1', 'Contacts eng'],
	['header-menu-item2', 'About eng'],
	['header-menu-item3', 'Something eng'],

	['intro-info-top', 'Intro info top eng'],
	['intro-info-bottom', 'Intro info eng'],
	['intro-info-action', 'Action eng']
])

Lang.createLang('uk', [
	['header-title', 'Title uk'],
	['header-menu-title', 'Main page uk'],
	['header-menu-item1', 'Contacts uk'],
	['header-menu-item2', 'About uk'],
	['header-menu-item3', 'Something uk'],

	['intro-info-top', 'Intro info top uk'],
	['intro-info-bottom', 'Intro info uk'],
	['intro-info-action', 'Action uk']
])

Lang.changeLang('uk')

const langBtn = document.getElementById('change_lang_btn')
langBtn.addEventListener('click', () => {
	langBtn.innerHTML = Lang.nextLangName
	Lang.changeLang(Lang.nextLangName)
})
