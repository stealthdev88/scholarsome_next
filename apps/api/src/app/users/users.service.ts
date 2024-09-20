import { Injectable } from "@nestjs/common";
import { PrismaService } from "../providers/database/prisma/prisma.service";
import { Prisma, User as PrismaUser } from "@prisma/client";
import { User } from "@scholarsome/shared";

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  /**
   * Queries the database for every user ID and when they were last modified
   * Used for sitemap generation
   *
   * @returns Array of all user IDs and when they were last updated
   */
  async getSitemapUserInfo(): Promise<{ id: string, updatedAt: Date }[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        updatedAt: true
      }
    });
  }

  /**
   * Queries the database for a unique user
   *
   * @param userWhereUniqueInput Prisma `UserWhereUniqueInput` selector
   *
   * @returns Queried `User` object
   */
  async user(
      userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      include: { sets: true, folders: true }
    });
  }

  /**
   * Queries the database for multiple users
   *
   * @param params.skip Optional, Prisma skip selector
   * @param params.take Optional, Prisma take selector
   * @param params.cursor Optional, Prisma cursor selector
   * @param params.where Optional, Prisma where selector
   * @param params.orderBy Optional, Prisma orderBy selector
   *
   * @returns Array of queried `User` objects
   */
  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        sets: true, folders: true
      }
    });
  }

  /**
   * Creates a user in the database
   *
   * @param data Prisma `UserCreateInput` selector
   *
   * @returns Created `User` object
   */
  async createUser(data: Prisma.UserCreateInput): Promise<PrismaUser> {
    return this.prisma.user.create({
      data
    });
  }

  /**
   * Updates a user in the database
   *
   * @param params.where Prisma where selector
   * @param params.data Prisma data selector
   *
   * @returns Updated `User` object
   */
  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<PrismaUser> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where
    });
  }


  /**
   * Deletes a user from the database
   *
   * @param where Prisma `UserWhereUniqueInput` selector
   *
   * @returns `User` object that was deleted
   */
  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<PrismaUser> {
    return this.prisma.user.delete({
      where
    });
  }
}
