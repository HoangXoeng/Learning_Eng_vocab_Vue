<template>
    <div class="header">
        <div class="header-session col-12">
            <div class="header__menu">
                <ul class="header__menu-list">
                    <li class="header__menu__item roboto-regular" id="menu--home">
                        Home
                    </li>
                    <li class="header__menu__item roboto-regular" id="menu--about">
                        About
                    </li>
                    <li class="header__menu__item roboto-regular" id="menu--contact">
                        Contact
                    </li>
                    <li class="header__menu__item roboto-regular" id="menu--gallery">
                        Gallery
                    </li>
                    <li class="header__menu__item roboto-regular" id="menu--team">
                        Team
                    </li>
                </ul>
            </div>
            <div class="header__search">
                <input type="text" id="header__search" class="roboto-light" placeholder="Find vocabulary" />
                <span class="header__search__icon"><i class="fa-solid fa-magnifying-glass"></i></span>
            </div>
        </div>
    </div>
</template>


<!-- <script>
export default {
  name: "Header",
};
</script> -->




<style scoped>
.header {
    height: 80px;
    background-color: #ebe4e4;
}

.header-session {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
}

.header__menu-list {
    display: flex;
    gap: 40px;
    margin-top: 27px;
    height: 19px;
}

.header__search {
    position: relative;
}

#header__search {
    margin-top: 28px;
    width: 382px;
    border-radius: 10px;
    background-color: white;
    outline: none;
    border: 1px solid #d6d8de;
    height: 28px;
    font-size: 16px;
    padding: 0 16px;
}

.header__search__icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(35%);
}
</style>