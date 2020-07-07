'use strict';

const shoppingList = [];

class ShoppingListItem {
    constructor(name, checked) {
        Object.assign(this, { name, checked });
    }
}

$(() => {
    // find our ui elements
    const entryField = $('#shopping-list-entry');
    const ul = $('.shopping-list');
    // define our rendering
    const renderShoppingListItem = item => `
        <li>
            <span class="shopping-item${item.checked ? ' shopping-item__checked' : ""}">${item.name}</span>
            <div class="shopping-item-controls">
                <button class="shopping-item-toggle">
                    <span class="button-label">check</span>
                </button>
                <button class="shopping-item-delete">
                    <span class="button-label">delete</span>
                </button>
            </div>
        </li>
    `;
    const renderShoppingList = () => ul.html(shoppingList.map(renderShoppingListItem).join(''));
    // read the server-generated list
    // CONTRACT -- each <li> has one .shopping-item (which may also be .shopping-item__checked)
    {
        ul.children().each(function() { // jquery's each() customizes "this" so needs an explicit function()
            let itemNode = $(this).find('.shopping-item');
            shoppingList.push(new ShoppingListItem(itemNode.text(), itemNode.hasClass('shopping-item__checked')));
        });
    }
    // handle new items
    $('#js-shopping-list-form').submit(e => {
        e.preventDefault(); // block navigation
        let newItemName = entryField.val();
        if(!newItemName)
            return;
        // TODO -- asynchronously push update to server
        shoppingList.push(new ShoppingListItem(newItemName, false));
        renderShoppingList();
        entryField.val('');
    });
    // handle checking and deleting
    ul.on('click', '.shopping-item-toggle', e => {
        // TODO -- asynchronously push update to server
        const item = shoppingList[$(e.target).closest('li').index()];
        item.checked = !item.checked;
        renderShoppingList();
    });
    ul.on('click', '.shopping-item-delete', e => {
        // TODO -- asynchronously push update to server
        shoppingList.splice($(e.target).closest('li').index(), 1);
        renderShoppingList();
    })
});