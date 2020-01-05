#!/bin/sh

mockgen -source domain/item.go -destination domain/mocks/item.go
mockgen -source domain/item_detail.go -destination domain/mocks/item_detail.go